# Products Viewer

SPA на React/TypeScript с Redux Toolkit для просмотра списка продуктов, деталей и CRUD‑действий. Данные загружаются из публичного API DummyJSON, пользовательские товары создаются локально и живут в Redux store.

Демо (GitHub Pages): https://KamDiaV.github.io/product-cards-spa

## ✨ Функционал

| Экран | Возможности |
| --- | --- |
| **Список** `/products` | Лайки (иконка с подсветкой), удаление, фильтр All/Favorites, поиск с дебаунсом (300 ms), пагинация, обрезка текста карточек, переход по клику |
| **Детальная** `/products/:id` | Подробности товара, кнопка «← Back to list», оптимизации изображений (`loading="lazy"`, `decoding="async"`) |
| **Создание** `/create-product` | Форма с валидацией (Zod), сохранение в store, тост об успехе и возврат к списку |
| **Редактирование** `/products/:id/edit` | Форма редактирования, тост об успехе и возврат к деталям |
| **Empty states** | Сообщение «No products found…» и кнопка Reset filters |
| **Toasts** | Уведомления об успешном создании/сохранении |

## 🛠 Стек

| Технология | Зачем |
| --- | --- |
| **React + TypeScript** | Базовый UI и строгая типизация |
| **Redux Toolkit** | Слайс `products`, санки, типизированные хуки `useAppDispatch`/`useAppSelector` |
| **React Router** | Маршруты: `/products`, `/products/:id`, `/create-product`, `/products/:id/edit` |
| **Zod** | Валидация форм (и типов значений форм) |
| **Vite** | Быстрая сборка и dev‑сервер |
| **CSS (кастомный)** | Стили с CSS‑переменными |
| **ESLint** | Единые правила и авто‑проверка качества кода |

## Требования

- Node.js (LTS)
- npm

## 🚀 Запуск проекта

```bash
npm install
npm run dev
```

Скрипты:

```bash
npm run build     # сборка (tsc + vite)
npm run preview   # локальный превью собранной версии
npm run lint      # линт
npm run predeploy # подготовка к деплою (build)
npm run deploy    # публикация в gh-pages
```

## 📁 Структура проекта

```
src/
  pages/              # ProductsPage, ProductDetailsPage, EditProductPage, CreateProductPage
  ui/                 # ProductCard, SearchInput, Tabs, Pagination, Toast, ...
  store/              # productsSlice, hooks.ts, index.ts
  hooks/              # useDebounce
  validation/         # productSchema
  types.ts            # типы (Product и др.)
  api.ts              # HTTP‑клиент DummyJSON
  index.css           # базовые стили и CSS‑переменные
```

## 🧩 Архитектурные решения

- Единый источник правды — слайс `products` (Redux Toolkit).
- Типизированные хуки вместо сырых `useDispatch`/`useSelector`.
- Пользовательские товары помечаются флагом `createdByUser`; данные живут в store.
- Поиск — локальный стейт + `useDebounce(300 ms)`, затем `dispatch(setSearch)`.
- Фильтры/пагинация — состояние и селекторы в Redux (`productsSlice`, селекторы в `productsSelectors`).
- Пустые состояния и not‑found — единый стиль отображения.

## 🚢 Деплой

- GitHub Pages: `predeploy` → `build`, затем `deploy` (публикация `dist`).

## ✅ Проверка качества

- ESLint: `npm run lint`
- Строгая типизация включена (см. `tsconfig.app.json`, опция `strict: true`)
