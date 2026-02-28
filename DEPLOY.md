# Деплой на GitHub Pages

После пуша в `master` workflow собирает проект и выкладывает артефакт через **GitHub Actions** (официальный способ, без ветки gh-pages).

## Включить сайт

1. Репозиторий → **Settings** → **Pages**.
2. **Build and deployment** → **Source**: выбери **GitHub Actions**.
3. Сохрани. При следующем пуше в `master` workflow «Deploy to GitHub Pages» соберёт проект и задеплоит.
4. Сайт откроется по адресу:

**https://rybushkin.github.io/zametka-quiz/**

(Со слэшем в конце. Для своего домена укажи Custom domain в том же разделе.)

## Если видишь «File not found» (404)

- Убедись, что последний run в **Actions** (workflow «Deploy to GitHub Pages») завершился **зелёным** — оба шага **build** и **deploy** должны быть успешны.
- В **Settings → Pages** должно быть: Source = **GitHub Actions** (не «Deploy from a branch»).
- Открывай сайт по адресу **https://rybushkin.github.io/zametka-quiz/** (со слэшем в конце).
- Если используешь свой домен: в **Pages** укажи Custom domain и дождись применения DNS.
