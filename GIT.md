# Git и релизы на GitHub

## Первый выклад на GitHub

### 1. Создать репозиторий на GitHub

1. Зайди на [github.com](https://github.com) → **New repository**.
2. Название, например: `zametka-quiz` (или как хочешь).
3. **Public**, без README / .gitignore — репо пустой.
4. Создай репозиторий.

### 2. Привязать проект и отправить код

Из папки проекта (где лежит этот GIT.md):

```bash
git remote add origin https://github.com/<ТВОЙ_ЮЗЕР>/<ИМЯ_РЕПО>.git
git branch -M main
git push -u origin main
```

Если репо создан с другим именем ветки (например `master`), замени `main` на неё.

### 3. Релизы (Releases)

Релиз на GitHub = тег + описание. Можно делать из интерфейса или из терминала.

**Через сайт GitHub:**

1. Репозиторий → **Releases** → **Create a new release**.
2. **Choose a tag:** введи тег, например `v0.1.0` → **Create new tag**.
3. Заголовок и описание (что изменилось).
4. **Publish release**.

**Через командную строку (если установлен [GitHub CLI](https://cli.github.com)):**

```bash
git tag v0.1.0
git push origin v0.1.0
gh release create v0.1.0 --title "Zametka v0.1.0" --notes "First deploy-ready version."
```

Дальше для новых версий: правишь код → коммит → пушишь → новый тег (v0.1.1, v1.0.0 и т.д.) → новый release.
