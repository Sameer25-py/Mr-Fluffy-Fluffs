import 'package:flutter/material.dart';
import 'package:fluffs/pin_entry_text_field.dart';
import 'package:flutter_progress_button/flutter_progress_button.dart' ;
import 'dart:async';
import 'dart:collection';
import 'package:requests/requests.dart' ;
import 'package:shared_preferences/shared_preferences.dart' ;

class SignupScreen2 extends StatefulWidget {
  @override
  _SignupScreen2State createState() => _SignupScreen2State();
}

class _SignupScreen2State extends State<SignupScreen2> {

  // screen details
  double screenWidth;
  double screenHeight;
  double blockSizeHorizontal;
  double blockSizeVertical;

  Map data = {} ;

  void init() {
    screenWidth = MediaQuery.of(context).size.width ;
    screenHeight = MediaQuery.of(context).size.height - MediaQuery.of(context).padding.top - kToolbarHeight - kBottomNavigationBarHeight ;
    blockSizeHorizontal = screenWidth / 100;
    blockSizeVertical = screenHeight / 100;
  }

  AlertDialog display_result(String message) {
    AlertDialog alert = AlertDialog (
      content: Text(message),
    ) ;

    return alert ;
  }

  int pin  = 000000 ; // Initial pin. It will change according to what user enters.
  int test ; // pin used if resend button used

  String number ;
  String username ;
  String password ;
  int twilio_code ; // original code received that HAS to match with what user enters to proceed
  bool rs = false ; // whether resend button used or not

  var verify_url = 'http://mr-fluffy-fluffs.herokuapp.com/api/user/verify' ;

  Future <dynamic> verify() async {
    var response = await Requests.post(
      verify_url,
      timeoutSeconds: 25
    ) ;

    dynamic j = response.json() ;
    return j ;
  }

  var resend_url = 'http://mr-fluffy-fluffs.herokuapp.com/api/user/resend' ;

  Future <dynamic> resend() async {
    var response = await Requests.post(
        resend_url,
        body: {
          "customer":{
            "MobileNo": number
          }
        },
        timeoutSeconds: 25,
        bodyEncoding: RequestBodyEncoding.JSON
    ) ;

    dynamic j = response.json() ;

    return j ;
  }

  @override
  Widget build(BuildContext context) {
    init() ;

    data = ModalRoute.of(context).settings.arguments ;
    twilio_code = data['code'] ;
    number = data['number'] ;
    username = data['username'] ;
    password = data['password'] ;

    return Scaffold(
      resizeToAvoidBottomPadding: false,
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        leading: GestureDetector(
          onTap: () {
            Navigator.of(context).pushReplacementNamed('/signup_screen1') ;
          },
          child: Icon(
            Icons.keyboard_arrow_left,
            size: blockSizeHorizontal * 10,
            color: Color(0xffbb5e1e),
          ),
        ),
      ),

      body: Column(
        children: <Widget>[
          Container(
            height: blockSizeVertical * 40,
            width: blockSizeHorizontal * 100,
            color: Colors.white,
            child: Image.asset('assets/signuptwo.png'),
          ),

          Container(
            // height: blockSizeVertical * 65,
            width: blockSizeHorizontal * 80,
            color: Colors.white,
            child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[

                  Text(
                    'Please Enter the 5-digit',
                    style: TextStyle(
                      fontSize: blockSizeHorizontal * 6,
                      fontFamily: 'NunitoSansSemiBold',
                      color: Color(0xffbb5e1e),
                    ),
                  ),

                  Text(
                    'verification code sent',
                    style: TextStyle(
                      fontSize: blockSizeHorizontal * 6,
                      fontFamily: 'NunitoSansSemiBold',
                      color: Color(0xffbb5e1e),
                    ),
                  ),

                  Text(
                    'on your SMS',
                    style: TextStyle(
                      fontSize: blockSizeHorizontal * 6,
                      fontFamily: 'NunitoSansSemiBold',
                      color: Color(0xffbb5e1e),
                    ),
                  ),

                  SizedBox(height: blockSizeHorizontal * 5) ,

                  PinEntryTextField(
                    fields: 5,
                    showFieldAsBox: false,
                    onSubmit: (String p) {
                      pin = int.parse(p) ;
                    },
                  ),

                  SizedBox(height: blockSizeHorizontal * 7) ,

                  ProgressButton(
                    animate: true,
                    color: Color(0xffbb5e1e),
                    defaultWidget: Text(
                      'Submit',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: blockSizeHorizontal * 3,
                        fontFamily: 'NunitoSansSemiBold',
                      ),
                    ),
                    progressWidget: const CircularProgressIndicator(
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                    ),
                    width: blockSizeHorizontal * 35,
                    height: blockSizeHorizontal * 19,
                    borderRadius: blockSizeHorizontal * 10,
                    onPressed: () async {
                      dynamic resp ;
                      bool verified = false ;
                      if (rs == false) {
                        if (pin == twilio_code) {
                          verified = true ;
                          resp = await Future.delayed(
                              const Duration(milliseconds: 5000), () => verify()) ;
                        }
                      }

                      else {
                        if (pin == test) {
                          verified = true ;
                          resp = await Future.delayed(
                              const Duration(milliseconds: 5000), () => verify()) ;
                        }
                      }

                      // After [onPressed], it will trigger animation running backwards, from end to beginning
                      return () {
                        if (verified == false) {
                          AlertDialog msg = display_result('Invalid pin. Please enter again.') ;
                          showDialog(
                            context: context,
                            builder: (BuildContext context) {
                              return msg ;
                            },
                          ) ;
                        }

                        else {
                          Navigator.of(context).pushReplacementNamed('/signup_screen3',
                              arguments: {
                                'username': username,
                                'password': password,
                              }) ;
                        }

                      };
                    },
                  ),

                  SizedBox(height: blockSizeHorizontal * 3) ,

                  FlatButton(
                    onPressed: () async {
                      dynamic resp ;
                      resp = await Future.delayed(
                          const Duration(milliseconds: 5000), () => resend()) ;
                      setState(() {
                        rs = true ;
                        test = resp['code'] ;
                      });
                    },
                    child: Text(
                      'Resend SMS',
                      style: TextStyle(
                        fontSize: blockSizeHorizontal * 4,
                        fontFamily: 'NunitoSansLight',
                        color: Colors.black,
                      ),
                    ),
                  ),

                ]
            ),
          ),


        ],
      ),
    );
  }
}
