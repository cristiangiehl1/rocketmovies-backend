
// Importando a biblioteca para fazer a captura de erros
require("express-async-errors");
require("dotenv/config");

const express = require("express");
const cors = require("cors");

// Importando a função de criação de database
const database = require("./database/sqlite");

// Importando a class AppError
const AppError = require("./utils/AppError");

const uploadConfig = require("./configs/upload");

const routes = require("./routes");

const app = express();

/*
After installing and importing the cors library, initialize cors in 
    our API to allow communication between the backend and the frontend.
*/
app.use(cors());

/*
     precisamos colocar essa o 'app.use(express.json())' para dizer para o node que 
     as requisições que vão vir pelo body da requisição está no formato
     json.

*/
app.use(express.json()) 

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

/*
    precisamos colocar o 'app.use(routes)' para que node possa 
    ler as rotas da nossa aplicação que estão sendo configuradas
    no index.js da pasta routes
*/
app.use(routes)

/*
     Chamando a função database() para fazer o conexão com o banco de 
     dados sqlite.
*/
database()

// Fazendo a leitura dos erros
app.use(( error, request, response, next ) => {
    /*
        se o error for uma instância do AppError, significa que é um erro   
        gerado pelo usuário. Pois nas nossas configs. nós vamos chamar
        o 'throw new AppError()' para fazer checagens em inputs do usuário.
    */         
   if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });    
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});


// Definindo a porta que a aplicação irá rodar.
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);    
});

