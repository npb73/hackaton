# hackaton
hackaton moscow 2024.

ИНСТРУКЦИЯ К ЗАПУСКУ

Работа FrontEnd части приложения реализована в контейнере.
В котром запускается сервер nginx и "раздает" статический контент
Для его запуска необходимо установить Docker.
Далее собрать обзаз из Dockeefile в папке Modules\Front\Dockerfile
    запустив команду docker build -t buildnamef:latest .
После сборки образа запустить из него контейнер, пробросив из контейнера порт 80
    docker run -d -ti --name c-fname -p 80:80 buildnamef:latest  

CI/CD

ci/cd часть в репозитории реализованна с помощью Github action
для деплоя приложения создан action и worklfow file
для его запуска необходимо:
    - перейти во вкладку ACTION
    - выбрать Deploy Application
    - запустить action с кнпки Run workflow, выбрав нужную ветку
В файле .github/workflows/manual.yml прописан скрипт для деплоя, в нем указан сервер для запуска -  host: 95.174.94.138, а также имя пользователя и ssh ключ для деплоя приложения на сервер
