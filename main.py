from src.data_handler.data_classes import createDataBase
from src.flasky.routes import app, create_rough_Work

if (__name__) == '__main__':
    createDataBase()
    create_rough_Work()
    app.run(debug=True)
