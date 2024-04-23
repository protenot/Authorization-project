

## Схема проверки работоспособности

Для проверки API можно использовать POSTMAN.

### 1. Регистрация пользователя

URL: POST http://localhost:8080/auth/registration

<u>Тело запроса:</u>
{  
"userName":"vladimir",  
"email":"vladimir@max.com",  
"password":"vladimir"  
}

<u>Требования к полям:</u>

\*userName: не может быть пустым

\*email: должен быть валидным адресом электронной почты

\*password: должен содержать от 6 до 25 символов  
<u>Ответ при успешной регистрации:</u>
{  
 "message": "The user has been successfully registered"  
}

### 2. Вход пользователя

URL: POST http://localhost:8080/auth/login

<u>Тело запроса:</u>
{  
"email":"vladimir@max.com",  
"password":"vladimir"  
}  
При успешном логировании получаем JWT токен, срок жизни токена 24 часа

### 3. Получение списка пользователей

URL: GET http://localhost:8080/auth/users

Для получения списка пользователей, пока необходима роль ADMIN, поэтому необходимо ввести соответствующий токен при осуществлении GET запроса.
