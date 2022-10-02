# Taxually Assesment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Key Features

- [x] User can create an account
- [x] User can login or logout
- [x] User can upload photos
- [x] User can delete their photos
- [x] User can view their uploaded photos
- [x] User can sort their photos by date and size.
- [x] User can filter their photos by size aka largest or smallest.
- [x] Alert messages are displayed when a user performs an action for e.g uploading or deleting a photo.

## App Architecture

- [x] Built using Angular 13.3.0
- [x] Has a single model in the models folder, which has **PhotoItem** and **User** interfaces.
- [x] Has three modules in the modules folder, which are **login**, **home**, and **shared**.

  - Login module has the login component and the loging routing module.

  - Home module has the home component and the home routing module.

  - Shared module has the **photo** and **alert** components which are shared across the app.

- [x] Has a services folder, which has the **global**, **auth**, **storage**, **guard** services.

  - Global service has the **setShowAlert** subject, which is used to show the alert message.

  - Auth service has the **signup**, **login**, **logout**, and **setUsers** methods as key features.

  - Storage service has the **saveImage**, **setStorage**, **getSavedPhotos** and **deletePhoto** methods as key features.

  - There are 2 key **guards**, which are the **auth** guard and the **login** guard.

  - The auth guard is used to **protect the home route**, and the login guard is used **to redirect the user to the home route** if they are already logged in.

  - State management using **RxJS** and **Ngrx**. State management is done using the **state** folder, which has the **actions**, **reducers**, and **selectors**.

  - Tests using **jest** and **jest-preset-angular**.

  - The App preview is hosted on **Firebase**. [Click here](https://taxually-assesment.web.app/) to view the app.

  - Setup GitHub actions to build and deploy the app to Firebase on every push to the main branch.

To view setup instructions, please visit the [setup instructions]('https://github.com/mayeedwin/taxually-app/blob/main/SETUP.md').
