from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

# Configuración de CORS para permitir peticiones desde Vite (localhost:5173)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Configuración de la base de datos
db_uri = 'mysql+pymysql://u31s95e6mllvngxm:N9Ca1ot2FkezF82duBRM@bhtttaanhzhkagixcuvw-mysql.services.clever-cloud.com:3306/bhtttaanhzhkagixcuvw'
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app, engine_options={"pool_pre_ping": True})

# --------------------------
# MODELOS
# --------------------------

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    contrasena = db.Column(db.String(100), nullable=False)

class Trabajador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    casco = db.Column(db.Boolean, default=False)
    guantes = db.Column(db.Boolean, default=False)
    lentes = db.Column(db.Boolean, default=False)

# --------------------------
# RUTAS
# --------------------------

@app.route("/")
def home():
    return jsonify({"message": "✅ Backend funcionando en Flask"})

# Login
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    nombre = data.get("nombre")
    contrasena = data.get("contrasena")

    if not nombre or not contrasena:
        return jsonify({"success": False, "message": "Faltan campos"}), 400

    usuario = Usuario.query.filter_by(nombre=nombre, contrasena=contrasena).first()

    if usuario:
        return jsonify({"success": True, "message": "Login exitoso"})
    else:
        return jsonify({"success": False, "message": "Credenciales incorrectas"}), 401

# Obtener todos los trabajadores
@app.route("/api/trabajadores", methods=["GET"])
def get_trabajadores():
    trabajadores = Trabajador.query.all()
    return jsonify([
        {
            "id": t.id,
            "nombre": t.nombre,
            "casco": t.casco,
            "guantes": t.guantes,
            "lentes": t.lentes
        } for t in trabajadores
    ])


# Actualizar un trabajador
@app.route("/api/trabajadores/<int:id>", methods=["PUT"])
def update_trabajador(id):
    data = request.get_json()
    t = Trabajador.query.get_or_404(id)
    
    t.casco = data.get("casco", t.casco)
    t.guantes = data.get("guantes", t.guantes)
    t.lentes = data.get("lentes", t.lentes)
    
    db.session.commit()
    return jsonify({"success": True, "message": "Trabajador actualizado"})

# --------------------------
# CREAR DATOS DE PRUEBA
# --------------------------

if __name__ == "__main__":
    with app.app_context():
        # Usuario de prueba
        if not Usuario.query.filter_by(nombre="admin").first():
            nuevo_usuario = Usuario(nombre="admin", contrasena="admin")
            db.session.add(nuevo_usuario)

        # Trabajadores de ejemplo
        if not Trabajador.query.first():
            t1 = Trabajador(nombre="Juan Perez", casco=True, guantes=False, lentes=True)
            t2 = Trabajador(nombre="Ana Lopez", casco=False, guantes=True, lentes=False)
            db.session.add_all([t1, t2])

        db.session.commit()

    app.run(debug=True, port=5000)
