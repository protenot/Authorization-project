<h1 align="center">Разработка системы авторизации и управления пользователями на React-Typescript с использованием JWT, REST-API и Ant Design на базе express и mongoDB</h1>

<h2>В этом проекте использованы:</h2>

<div style="display: flex;">
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
<p>Typescript</p>
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40" />
</a>


<a href="https://ant.design/" target="_blank" rel="noreferrer">
<p>Ant Design</p>
    <img src="https://img.jsdelivr.com/github.com/ant-design.png" alt="Ant Design" width="40" height="40" />
</a>

<a href="https://reactjs.org/" target="_blank" rel="noreferrer">
<p>React</p>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="40" height="40" />
</a>

<a href="https://react-redux.js.org/" target="_blank" rel="noreferrer">
<p>React-Redux</p>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React Redux" width="40" height="40" />
</a>

<a href="https://redux-toolkit.js.org/" target="_blank" rel="noreferrer">
<p>Redux-Toolkit</p>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="Redux Toolkit" width="40" height="40" />
</a>

<a href="https://react-query.tanstack.com/" target="_blank" rel="noreferrer">
<p>RTK Query</p>
    <img src="https://redux-toolkit.js.org/img/redux.svg" alt="RTK Query" width="40" height="40" />
</a>

<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">
<p>MongoDB</p>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="40" height="40" />
</a>
</div>
# Для запуска проекта, необходимо выполнить следующие шаги:
### Для запуска необходима база mongoDB установленная локально

1. Склонировать репозиторий проекта по ссылкеhttps://github.com/protenot/Authorization-project на свой компьютер.   

```
git clone https://github.com/protenot/Authorization-project

```

2. Открыть терминал (или командную строку) и перейти в  директорию проекта backend/authServer.   

```   
cd backend/authServer   

```   
3. Установить зависимости для серверной части проекта. Введите следующую команду в терминале:   

```  
npm install  
```     

4. Переименовать файл .env.example (убрать .example)   
```  
.env   
```   
5. Запустить сервер командой
```   
npm run start   
```   
6. При запуске, в локальной базе mongoDB создастся новая база, под названием auth с двумя предзаполненными  коллекциями "users" и "roles"

6. Перейти в директорию frontend/authservice и установить зависимости для клиентской части проекта.
```  
cd frontend/authservice  
npm install
```  
7. Запустить клиентскую часть. Введите следующую команду в терминале:
```
npm run dev
```

8. Открыть браузер и перейти по адресу http://localhost:3000, чтобы увидеть запущенный проект.

## Для управления пользователями необходимо:

Ввести почту admin@test.test  
пароль admin1   


После этого будут доступны для посещения адреса /users, /users/:id, users/add, users/edit    

При вводе данных пользователя с ролью USER, для посещения будyт доступны только страницы авторизации, домашняя и auth/currentUser, где отражается информация о пользователе.