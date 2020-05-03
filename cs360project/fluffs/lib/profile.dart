import 'package:flutter/material.dart';
import 'package:fluffs/cart_1.dart';
import 'package:fluffs/privacy.dart';
import 'dart:async';
import 'dart:collection';
import 'package:requests/requests.dart' ;
import 'package:shared_preferences/shared_preferences.dart' ;

class Profile extends StatefulWidget {
  @override
  _ProfileState createState() => _ProfileState();
}

// Multiple Column and Row Widgets were used here to make the Screen
// Multiple manually constructed widgets were also created

class _ProfileState extends State<Profile> {

  AlertDialog display_result(String message) {
    AlertDialog alert = AlertDialog (
      content: Text(message),
    ) ;

    return alert ;
  }

  var guest_logout_url = 'http://mr-fluffy-fluffs.herokuapp.com/api/guest/logout' ;
  var user_logout_url = 'http://mr-fluffy-fluffs.herokuapp.com/api/user/logout' ;
  String name ;

  Future <void> guest_logout() async {
    var response = await Requests.post(
        guest_logout_url,
        body: {},
        bodyEncoding: RequestBodyEncoding.JSON
    );
    response.raiseForStatus();
    dynamic j = response.json() ;
  }

  Future <void> user_logout() async {
    var response = await Requests.post(
        user_logout_url,
        body: {},
        bodyEncoding: RequestBodyEncoding.JSON
    );
    response.raiseForStatus();
    dynamic j = response.json() ;
  }

  var status_url = 'http://mr-fluffy-fluffs.herokuapp.com/api/user/' ;

  // to check whether guest is logged in or a registered user
  Future <void> check_status() async {
    var response = await Requests.get(
      status_url,
    );
    response.raiseForStatus();

    dynamic j = response.json() ;

    if (j['msg'].contains('You must be logged in to access this feature')) {
      name = 'Guest' ;
    }

    else {
      dynamic data = j['data'] ;
      name = data['FullName'] ;
    }
  }

  @override

  void initState() {
    check_status() ;
  }

  @override
  Widget build(BuildContext context) {

    var wTH = MediaQuery.of(context).size.width;
    var hTH = MediaQuery.of(context).size.height;
    var blockWidth = wTH / 100;
    var blockHeight = hTH / 100;
    name = 'Loading...' ;

    return Material(
      child: Column(
        children: <Widget>[
          Padding(
            padding: EdgeInsets.only(top: blockHeight * 2.8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                IconButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  icon: Icon(Icons.keyboard_arrow_left),
                  color: Colors.red[400],
                ),
                IconButton(
                  onPressed: () {
                    Navigator.push(
                      context, MaterialPageRoute(
                      builder: (context) => Cart(),
                    ),
                    );
                  },
                  icon: Icon(Icons.shopping_cart),
                  color: Colors.red[200],
                ),
              ],
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              profileIcon(blockWidth),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Container(
                padding: EdgeInsets.fromLTRB(0, blockHeight * 2, 0, blockHeight * 2),
                child: Text(
                  name,
                  style: TextStyle(
                    fontSize: blockWidth * 7,
                    fontWeight: FontWeight.bold,
                    color: Colors.brown[400],
                  ),
                  textAlign:TextAlign.center,
                ),
              ),
              lines(blockWidth),
              tiles("Privacy Settings", Privacy()),
              lines(blockWidth),
              tiles("Order History", Cart()),
              lines(blockWidth),
              tiles("Review History", Cart()),
              lines(blockWidth),
              FlatButton(
                  onPressed: () async {

                    if (name == 'Guest') {
                      await Future.delayed(
                          const Duration(milliseconds: 2000), () => guest_logout()) ;
                      Navigator.of(context).pushReplacementNamed('/opening_screen') ;
                    }

                    else {
                      await Future.delayed(
                          const Duration(milliseconds: 2000), () => user_logout()) ;
                      Navigator.of(context).pushReplacementNamed('/opening_screen') ;
                    }
                  },

                  textColor: Colors.red[400],
                  child: Text(
                    "Log Out",
                    style: TextStyle(
                      fontSize: blockWidth * 4,
                    ),
                  )
              ),
              lines(wTH),
            ],
          ),
        ],
      ),
    );
  }
}

// This is a manually constructed widget that places the profile icon and creates a circular border around the icon

Widget profileIcon(wTH) {
  return Container(
    padding: EdgeInsets.all(wTH * 6),
    decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(wTH * 16),
        border: Border.all(width: wTH * 0.5, color: Colors.brown[200])),
    child: Icon(
      Icons.person,
      color: Colors.brown[600],
      size: wTH * 16,
    ),
  );
}

// This is a manually constructed widget that is used for creating same type of buttons

Widget tiles(String name, Widget wid) {
  return Builder(
      builder: (BuildContext context) {
        var wTH = MediaQuery.of(context).size.width;
        var blockWidth = wTH / 100;
        return FlatButton(
            onPressed: () {
              Navigator.push(
                context,MaterialPageRoute(
                builder: (context) => wid,
              ),
              );
            },
            textColor: Colors.brown[400],
            child: Text(
              name,
              style: TextStyle(
                fontSize: blockWidth * 4,
              ),
            )
        );
      }
  );
}

// This is a manually constructed Widget which is used to add a divider between the buttons and the next few lines of Text

Widget lines(wTH) {
  return Divider(
    thickness: 0.4,
    color: Colors.black,
    indent: wTH * 4,
    endIndent: wTH * 5,
  );
}