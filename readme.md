<img src="https://github.com/kkamara/useful/blob/main/book-store-management-system7.png?raw=true" alt="book-store-management-system7.png" width=""/>

<img src="https://github.com/kkamara/useful/blob/main/book-store-management-system.png?raw=true" alt="book-store-management-system.png" width=""/>

<img src="https://github.com/kkamara/useful/blob/main/book-store-management-system2.png?raw=true" alt="book-store-management-system2.png" width=""/>

<img src="https://github.com/kkamara/useful/blob/main/book-store-management-system3.png?raw=true" alt="book-store-management-system3.png" width=""/>

<img src="https://github.com/kkamara/useful/blob/main/book-store-management-system4.png?raw=true" alt="book-store-management-system4.png" width=""/>

<img src="https://github.com/kkamara/useful/blob/main/book-store-management-system5.png?raw=true" alt="book-store-management-system5.png" width=""/>

<img src="https://github.com/kkamara/useful/blob/main/book-store-management-system6.png?raw=true" alt="book-store-management-system6.png" width=""/>

# Book Store Management System [![API](https://github.com/kkamara/book-store-management-system/actions/workflows/build.yml/badge.svg)](https://github.com/kkamara/book-store-management-system/actions/workflows/build.yml)

(26-Sep-2026) V2 of https://github.com/kkamara/book-store-management-system . Laravel 11 to 13 upgrade, React 18 to 19 upgrade, structural improvements, and a new Material UI design.

* [Using Postman?](#postman)

* [Installation](#installation)

* [Usage](#usage)

* [API Documentation](#api-documentation)

* [Unit Tests](#unit-tests)

* [Contributing](#contributing)

* [License](#license)

<a name="postman"></a>
## Using Postman?

[Get Postman HTTP client](https://www.postman.com/).

[Postman API Collection for Book Store Management System 2](./database/book-store-management-system-2.postman_collection.json).

[Postman API Environment for Book Store Management System 2](./database/book-store-management-system-2.postman_environment.json).

## Installation

* [Laravel Herd](https://herd.laravel.com)
* [MySQL (recommended) or database engine of SQLite, MariaDB, PostgreSQL, SQL Server](https://laravel.com/docs/11.x/database#introduction)
* [https://laravel.com/docs/11.x/installation](https://laravel.com/docs/11.x/installation)
* [https://laravel.com/docs/11.x/vite#main-content](https://laravel.com/docs/11.x/vite#main-content)

```powershell
# Create our environment file.
cp .env.example .env
# Update database values in .env file.
# Install our app dependencies.
composer i
php artisan key:generate
# Before running the next command:
# Update your database details in .env
# Note that the following path is fixed for Powershell usage.
php artisan migrate --path=database\migrations\v1 --seed
npm install
npm run build
```

## Usage

```bash
herd link book
# Website accessible at http://book.test
```

## API Documentation

```bash
php artisan route:list
# output
...
POST       api/user ............................ login › V1\API\UserController@login
GET|HEAD   api/user/authorize .................. V1\API\UserController@authorizeUser
POST       api/user/register ................... V1\API\UserController@register
...
```

## Unit Tests

```bash
php artisan test --filter=Feature
```

View the unit test code [here](./tests/Feature/V1).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[BSD](https://opensource.org/licenses/BSD-3-Clause)
