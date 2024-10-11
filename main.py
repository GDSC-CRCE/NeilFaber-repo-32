from src.data_handler.data_classes import createDataBase
from src.flasky.routes import app

if (__name__) == '__main__':
    createDataBase()
    app.run(debug=True)
