# Архітектура проекту

1. Компоненти написані у функціональному стилі із використанням хуків де це необхідно. Також використовується патерн контейнерних і презентаційних компонентів.
2. Опис папок src:
    2.1.  api - знаходяться файли для роботи із бек-ендом. Для запитів використовуємо axios. У файлі api.js, створюємо axiosInstance і налаштовуємо його. Також додав перехоплювач axios запиту, потрібно було для того щоб при логіні слалися запити із токеном.
    2.2.  components - знаходяться всі компоненти проекту.
    2.3.  constants - Файл із глобальними константами, поки лише 2 константи API_URL та DEFAULT_ERROR_MESSAGE.
    2.4.  hoc - Маємо один HOC withAuthRedirect який перенаправляє користувача на логінізацію із закритих сторінок.
    2.5.  store - Для стейт менеджменту використовуємо redux. Структура коду побудована за прикладом Redux Ducks. Маємо дві гілки стейту auth, movies.
3. Для маршрутизації використовується react-router-dom. Всі маршрути описані у файлі App.jsx.
4. Для загальних компонентів використовується Ant Design.
5. Для форм використовується react hook form.
6. Для стилів використовується модульний SCSS.
7. Додано файл jsconfig.json і в ньому налаштовано імпортування із папки src, для більш зручної роботи з імпортами.

За основу брав архітектуру проекту ["React JS - путь самурая 1.0"](https://www.youtube.com/playlist?list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8) з деякими своїми модифікаціями. Якщо потрібно можу писати у іншому стилі.

## Docker

[Link to dockerHub](https://hub.docker.com/r/idkas1199/movies)

Starting instance:

### `docker run --name movies -p 3000:3000 idkas1199/movies`

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
