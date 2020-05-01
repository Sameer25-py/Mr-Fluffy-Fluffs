# Mr-Fluffy-Fluffs
Source code and offical API documentation for the project Mr Fluffy Fluffs.

*The backend is implemented as standard Stateless REST API. However, session management has been done on top of that for CSRF protection and exposing data like user credentials publicly.*

## Base URL
http://mr-fluffy-fluffs.herokuapp.com/

## Routes
Every route is preceded by **/api/[route]**. There are ***four*** main routes for fetching and sending data to the API. 

- Common
- User
- Admin
- Guest

_Note that any method (route) requiring any admin or user previliges is written in the following format._
<br>
Method ***[Admin]***
<br>
Method ***[User]*** 

## Routes List and Methods
_Every routes requiring parameters e.g [/:id], must be provided with_ **mongoose unique document id**.

> Common
- **get** api/common/menu
- **get** api/common/menu/:id
- **get** api/common/toppings
- **get** api/common/toppings/:id
- **get** api/common/fillings
- **get** api/common/fillings/:id
- **get** api/common/custom

- **put** api/menu ***[Admin]***
- **put** api/toppings ***[Admin]***
- **put** api/fillings ***[Admin]***

- **patch** api/menu/:id ***[Admin]***
- **patch** api/toppings/:id ***[Admin]***
- **patch** api/fillings/:id ***[Admin]***

- **delete** api/menu/:id ***[Admin]***
- **delete** api/toppings/:id ***[Admin]***
- **delete** api/fillings/:id ***[Admin]***

> User
- **post** api/login
- **post** api/logout ***[User]***

- **get** api/user ***[Admin]***
- **get** api/user/:id ***[Admin]***
- **get** api/user/id/cart 
- **get** api/user/id/cakes
- **get** api/user/id/cakes/id

- **put** api/user/
- **put** api/user/id/cart
- **put** api/user/id/cakes

- **delete** api/user/:id ***[Admin]***
- **delete** api/user/:id/cart/:itemid ***[Admin]***
- **delete** api/user/:id/cart
- **delete** api/user/id/cakes/:cakeid 
- **delete** api/user/:id/cakes

- **patch** api/user/:id ***[User]***

> Admin
- **get** /api/admin/ ***[Admin]***
- **get** /api/admin/:id ***[Admin]***

- **post** /api/admin/login
- **post** /api/admin/logout ***[Admin]***

- **put** /api/admin ***[Admin]***

- **delete** /api/admin/:id ***[Admin]***

- **patch** /api/admin/:id ***[Admin]***

> Guest

- **post** /api/guest/login 
- **post** /api/guest/logout

## Requests
All the requests requiring body parameters to pass to api with request should be passed as JSON object.

- Adding pancake

***{
  "pancake": {
    "Name": "Admin Pancake",
    "Description": "This is a pancake from admin.",
    "Price": 1250
  }
}***

- Signing up a Customer

***{
	"customer":{		
		"FullName":"abc",
		"Username":"asd",
		"PassHash":"1233434",
		"Address":"asdasdsdd",
		"Email":"sameer@abc.com",
		"MobileNo":123456
	}
}***

## Response
The api send response in JSON format alongwith Status code.

- Fetching fillings

***{
    "status": "True",
    "msg": "Fillings",
    "data": [
        {
            "_id": "5e9efed8eb2b5c27128eeead",
            "Name": "Chocolate Chips ",
            "Price": 50,
            "__v": 0
        },
        {
            "_id": "5ea009c7109ca0246b9e1566",
            "Name": "New filling",
            "Price": 230,
            "__v": 0
        },
        {
            "_id": "5ea009d4109ca0246b9e1567",
            "Name": "Small",
            "Price": 1000,
            "__v": 0
        }
    ]
}***

- Fetching one filling

***{
    "status": "True",
    "msg": "Filling found.",
    "data": {
        "_id": "5ea009c7109ca0246b9e1566",
        "Name": "New filling",
        "Price": 230,
        "__v": 0
    }
}***









