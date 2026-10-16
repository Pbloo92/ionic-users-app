# Users App — Ionic + Angular

Proyecto didáctico basado en el PDF **Introducción a Ionic**. La aplicación presenta usuarios activos obtenidos desde una API REST pública.

## Requisitos
- Node.js compatible con la versión de Angular instalada (usa una versión LTS compatible).
- npm
- Visual Studio Code recomendado.
- Para Android: Android Studio + Android SDK.
- Para iOS: macOS + Xcode.

## Ejecutar
Desde esta carpeta (la configuración de Angular ya incluye el objetivo `app:serve` que utiliza Ionic CLI):
```bash
npm install
npm start
```
Abre la dirección local que indique Ionic (normalmente `http://localhost:8100`).

## Qué incluye
- Modelo tipado `User`.
- `UsersService`, que centraliza HTTP y transforma la respuesta de DummyJSON.
- Página `UsersPage` con carga, error, actualización manual y refresco.
- Routing con rutas standalone y carga diferida.
- Sintaxis moderna Angular `@if` / `@for`.
- Configuración inicial para Capacitor.

## API y datos
Se consulta `https://dummyjson.com/users`. Para practicar, el campo `active` se calcula a partir del ID porque la API pública no proporciona ese campo de negocio. La API es de demostración; no guarda cambios de la aplicación.

## Compilar
```bash
npm run build
```
La configuración genera el resultado web en `www/`.

## Añadir Android
Instala Capacitor CLI y el paquete de plataforma si no están presentes:
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap add android
npm run build
npx cap sync android
npx cap open android
```
En Android Studio inicia un emulador y pulsa Run. Si `npx cap add android` indica que la plataforma ya existe, no lo repitas.

## Live Reload en Android
Con un emulador abierto:
```bash
ionic cap run android -l --external
```
En dispositivos físicos, ordenador y móvil deben estar en la misma red. Permite el acceso de red del firewall si se solicita.

## iOS
Solo en macOS con Xcode:
```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap add ios
npm run build
npx cap sync ios
npx cap open ios
```

## Importante sobre versiones
El PDF usa ejemplos de Angular más antiguos (módulos, `*ngIf`, `*ngFor`) y comandos de Capacitor que pueden variar según la versión. Este proyecto utiliza componentes standalone y `@if` / `@for`. Comprueba las versiones compatibles antes de actualizar paquetes.

## Comparación rápida con React
- `{{ user.name }}` es interpolación Angular; en JSX se escribiría `{user.name}`.
- `(click)="loadUsers()"` equivale conceptualmente a `onClick={loadUsers}`.
- `@for` es similar a `array.map(...)` para renderizar listas.
- `UsersService` centraliza acceso a datos; puede cumplir una función parecida a un hook/contexto personalizado, aunque no son idénticos.
- `ngOnInit` es un hook de ciclo de vida, no una copia exacta de `useEffect`.
