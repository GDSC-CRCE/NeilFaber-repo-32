from src.data_handler.data_classes import createDataBase
from src.flasky.routes import app, insertData

if (__name__) == '__main__':
    createDataBase()
    insertData()
    app.run(debug=True, host='0.0.0.0')
