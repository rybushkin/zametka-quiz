# Деплой на GitHub Pages

После пуша в `master` workflow собирает проект и пушит результат в ветку **gh-pages**.

## Включить сайт

1. Репозиторий → **Settings** → **Pages**.
2. **Build and deployment** → **Source**: выбери **Deploy from a branch** (не «GitHub Actions»).
3. **Branch**: выбери **gh-pages**, папка **/ (root)**.
4. Сохрани. Через 1–2 минуты сайт откроется по адресу:

**https://rybushkin.github.io/zametka-quiz/**

(Обязательно со слэшем в конце и с именем репозитория в пути.)

## Если видишь «File not found»

- Убедись, что последний run в **Actions** завершился зелёным (деплой действительно прошёл).
- В репо переключись на ветку **gh-pages** и проверь: в корне должен быть файл **index.html**.
- В **Settings → Pages** должно быть: Source = **Deploy from a branch**, Branch = **gh-pages**, папка **/ (root)**.
- Открывай сайт по адресу **https://rybushkin.github.io/zametka-quiz/** (со слэшем в конце).
- Если используешь свой домен: в **Pages** укажи Custom domain и дождись применения DNS.
