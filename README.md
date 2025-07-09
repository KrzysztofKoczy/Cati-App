# CatiApp

Projekt stworzony przy użyciu [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0 

Aplikacja do zarządzania ocenami, umożliwiająca definiowanie progów procentowych i przypisywanie im ocen opisowych. 

## 🚀 Live Demo

Sprawdź aplikację live: [Cat Facts App Demo](https://krzysztofkoczy.github.io/Cati-App/)

## Funkcje

### **Autoryzacja i Bezpieczeństwo**

- 🔑 System logowania z walidacją
- 👤 Konto demo dla szybkiego dostępu
- 🛡️ Ochrona endpointów, dostępnych dopiero po zalogowaniu (Route Guards)

### **Zarządzanie Faktami**

- 🐾 Ładowanie kolejnych ciekawostek na scroll
- ⭐ System ulubionych z lokalnym zapisem
- 🔄 Automatyczne usuwanie duplikatów
- 📊 Licznik załadowanych faktów

### **Zaawansowane Funkcje**

- 🚀 Infinite scroll z Intersection Observer
- 📡 Integracja z zewnętrznym API (MeowFacts)
- 🎯 Optymalizacja wydajności z OnPush
- 🎪 Micro-interactions i animacje CSS
🌊 **Reaktywne programowanie z RxJS** - zaawansowane operatory do streamowania danych:

- `repeat()` - ciągłe pobieranie faktów z API
- `filter()` & `distinct()` - eliminacja duplikatów w czasie rzeczywistym
- `take()` & `toArray()` - kontrola ilości pobieranych faktów
- `tap()` - side effects dla cache management
- `catchError()` & `finalize()` - obsługa błędów i cleanup
- `map()` - transformacja danych API response

- Zarządzanie ocenami z progami procentowymi
- Definiowanie ocen symbolicznych i opisowych
- Walidacja formularzy
- Responsywny interfejs

## 🛠️ Technologie

- Angular CLI 19.2.0
- TypeScript 5.7.2
- RxJS
- SCSS
- Angular Signals
- Standalone Components
- OnPush Change Detection
- Reactive Forms
- Route Guards

## 🔧 Instalacja

1. Zainstaluj zależności:
```bash
npm install
```

2. Uruchom aplikację:
```bash
ng serve
```

3. Otwórz aplikację w przeglądarce:
```
http://localhost:4200
```
