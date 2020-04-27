import 'package:flutter/material.dart';
import 'package:fluffs/profile.dart';
import 'package:fluffs/extra.dart';

Widget lines(wTH) {
  return Divider(
    thickness: 0.4,
    color: Colors.black,
    indent: wTH * 0.04,
    endIndent: wTH * 0.05,
  );
}

// Main Class which uses multiple Row and Column Widgets to place them on their appropriate places (Aligned)

class Cart extends StatefulWidget {
  @override
  _CartState createState() => _CartState();
}

class _CartState extends State<Cart> {

  int phone = 03214559559;
  String address = "LUMS";
  double delPrice = 40;

  @override
  Widget build(BuildContext context) {
    var wTH = MediaQuery.of(context).size.width;
    var hTH = MediaQuery.of(context).size.height;
    var blockWidth = wTH / 100;
    var blockHeight = hTH / 100;

    return Scaffold(
      body: ListView(
        shrinkWrap: true,
        children: <Widget>[
          Padding(
            padding: EdgeInsets.only(top: blockHeight * 2.8),
            child: Row(
              children: <Widget>[
                IconButton(
                  onPressed: () {
                    Navigator.push(
                      context, MaterialPageRoute(
                        builder: (context) => Profile(),
                      ),
                    );
                  },
                  icon: Icon(Icons.person, color: Colors.red[200]),
                ),
              ],
            ),
          ),
          SizedBox(height: blockHeight * 2),
          Padding(
            padding: EdgeInsets.only(left: blockWidth * 2.5),
            child: Align(
              alignment: Alignment.centerLeft,
              child: Text(
                "My Cart (${bloc.allItems[bloc.allItems.length-1]['quan'] + bloc.allItems[bloc.allItems.length-1]['number']})",
                style: TextStyle(
                  color: Color(0xffbb5e1e),
                  fontSize: blockWidth * 5,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          SizedBox(height: blockHeight * 0.5),
          lines(blockWidth),
          ListView.builder(
              primary: false,
              shrinkWrap: true,
              itemCount: bloc.allItems == null ? 0 :bloc.allItems.length,
              itemBuilder: (BuildContext context, int index) {
                Map elem = bloc.allItems[index];
                return CartMenu(
                  index: elem,
                  name: elem['name'],
                  price: elem['price']*elem['number'],
                  img: elem['img'],
                  number: elem['number'],
                );
              },
          ),
          lines(blockWidth),
          PriceMenu(subTotal: bloc.calculate(), delPrice: delPrice),
          lines(blockWidth),
          UserMenu(name: "Contact Info", element: phone),
          lines(blockWidth),
          UserMenu(name: "Address", element: address),
          lines(blockWidth),
          UserMenuTwo(),
          lines(blockWidth),
        ],
      ),
      bottomNavigationBar: OrderButton(),
    );
  }
}

// This Class shows the different Items and can allow users to add or decrease their items

class CartMenu extends StatefulWidget {

  final name, img, index;
  int price, number, quan;

  // final cartStreamController = StreamController.broadcast();

  CartMenu({Key key, this.index, this.name, this.price, this.img, this.number, this.quan}): super(key:key);

  @override

  _CartMenuState createState() => _CartMenuState();

}

class _CartMenuState extends State<CartMenu> {

  @override
  Widget build(BuildContext context) {
    var wTH = MediaQuery.of(context).size.width;
    var hTH = MediaQuery.of(context).size.height;
    var blockWidth = wTH / 100;
    var blockHeight = hTH / 100;
    int n = widget.number;


    return Container(
      padding: EdgeInsets.fromLTRB(
          blockWidth * 2, blockHeight * 1.5, 0, blockWidth * 1),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Padding(
                // For Text Padding
                padding: EdgeInsets.only(left: 0.0, right: blockWidth * 1.5),
                child: Container(
                  height: blockWidth * 12,
                  width: blockWidth * 12,
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(blockWidth * 2),
                    child: Image.asset(
                      widget.img,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              Text(
                widget.name,
                style: TextStyle(
                  fontSize: blockWidth * 2.8,
                  fontWeight: FontWeight.bold,
                  color: Color(0xffbb5e1e),
                  fontFamily: 'NunitoSansSemiBold',
                ),
              ),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              Align(
                alignment: Alignment.topLeft,
                child: SizedBox(
                  height: blockHeight * 2.8,
                  child: FloatingActionButton(
                    onPressed: () {
                      setState(() {
                        // bloc.updateItem("-");
                          widget.number = bloc.updateDItem(widget.index);
                          widget.price = bloc.updateDPrice(widget.index);
                          quan--;
                          Navigator.push(
                              context, MaterialPageRoute(
                            builder: (BuildContext context) => Cart(),
                          ));
                          // widget.number--;
                      });
                    },
                    child: Icon(Icons.remove, color: Color(0xffbb5e1e), size: blockWidth * 3),
                    backgroundColor: Colors.white,
                    heroTag: null,
                  ),
                ),
              ),
              SizedBox(width: blockWidth * 0.05),
              Text('${widget.number}', style: TextStyle(fontSize: blockWidth * 4)),
              SizedBox(width: blockWidth * 0.05),
              Align(
                alignment: Alignment.topRight,
                child: SizedBox(
                  height: blockHeight * 2.8,
                  child: FloatingActionButton(
                    onPressed: () {
                      setState(() {
                        widget.number = bloc.updateAItem(widget.index);
//                        widget.price = bloc.updateAPrice(widget.index);
                        // bloc.allItems.forEach((f) => f['price'] + f['original']);
                        int i = 0;
                        bloc.allItems[i]['price'] = bloc.allItems[i]['price'] + bloc.allItems[i]['original'];
                        quan++;
                        Navigator.push(
                            context, MaterialPageRoute(
                          builder: (BuildContext context) => Cart(),
                        ));
//                         int p = widget.price;
//                         int n = widget.number;
//                         int x = (p~/(n-1));
//                         widget.price = p + x;
//
//                         Navigator.push(
//                             context, MaterialPageRoute(
//                           builder: (BuildContext context) => Cart(),
//                        ));
                      });
                    },
                    child: Icon(
                      Icons.add,
                      color: Colors.white,
                      size: blockWidth * 3
                    ),
                    backgroundColor: Color(0xffbb5e1e),
                    heroTag: null,
                  ),
                ),
              ),
            ],
          ),
          // Text("${widget.price}", style: TextStyle(fontSize: blockWidth * 4, color: Color(0xffbb5e1e), fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}

// This Class shows the prices which appear on the Screen

class PriceMenu extends StatefulWidget {

  final subTotal, delPrice,number;

  PriceMenu({Key key, this.subTotal, this.delPrice, this.number}) : super(key:key);

  @override
  _PriceMenuState createState() => _PriceMenuState();
}

class _PriceMenuState extends State<PriceMenu> {
  @override
  Widget build(BuildContext context) {
    var wTH = MediaQuery.of(context).size.width;
    var hTH = MediaQuery.of(context).size.height;
    var blockWidth = wTH / 100;
    var blockHeight = hTH / 100;

    return Container(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: <Widget>[
          Column(
            children: <Widget>[
              Row(
                children: <Widget> [
              Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    "Subtotal",
                    style: TextStyle(
                      fontSize: blockWidth * 3,
                      color: Color(0xffbb5e1e),
                    ),
                   ),
                  SizedBox(height: blockHeight * 0.5),
                  Text(
                    "Delivery Fee",
                    style: TextStyle(
                      fontSize: blockWidth * 3,
                      color: Color(0xffbb5e1e),
                    ),
                   ),
                  SizedBox(height: blockHeight * 0.5),
                  Text(
                    "Total",
                    style: TextStyle(
                      fontSize: blockWidth * 3,
                      color: Color(0xffbb5e1e),
                    ),
                   ),
                ],
              ),
              SizedBox(width: blockWidth * 1.4),
              Padding(
                padding: EdgeInsets.only(right: blockWidth * 2),
                child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                      Text(
                        "${widget.subTotal}",
                        style: TextStyle(
                          fontSize: blockWidth * 3,
                          fontWeight: FontWeight.bold,
                          color: Color(0xffbb5e1e),
                        ),
                      ),
                      SizedBox(height: blockHeight * 0.5),
                      Text(
                        "${widget.delPrice}",
                        style: TextStyle(
                          fontSize: blockWidth * 3,
                          fontWeight: FontWeight.bold,
                          color: Color(0xffbb5e1e),
                        ),
                      ),
                      SizedBox(height: blockHeight * 0.5),
                      Text(
                        "${widget.subTotal + widget.delPrice}",
                        style: TextStyle(
                          fontSize: blockWidth * 3,
                          fontWeight: FontWeight.bold,
                          color: Color(0xffbb5e1e),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// This Class shows Address and Phone Buttons

class UserMenu extends StatefulWidget {
  
  final element, name;

  UserMenu({Key key, this.name, this.element}) : super(key:key);
  
  @override
  _UserMenuState createState() => _UserMenuState();
}

class _UserMenuState extends State<UserMenu> {
  @override
  Widget build(BuildContext context) {
    var wTH = MediaQuery.of(context).size.width;
    var blockWidth = wTH / 100;

    return Container(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget> [
          Row(
            children: <Widget> [
              Padding(
                padding: EdgeInsets.fromLTRB(blockWidth * 2,0,0,0),
                child: Text(
                  widget.name,
                  style: TextStyle(
                    fontSize: blockWidth * 3,
                    fontWeight: FontWeight.bold,
                    color: Color(0xffbb5e1e),
                  ),
                ),
              ),
            ],
         ),
          Row(
            children: <Widget> [
              Padding(
                padding: EdgeInsets.fromLTRB(0,0,blockWidth * 2.5,0),
                child: FlatButton(
                  onPressed: (){
                    print("Noice");
                  },
                  child: Text(
                    "${widget.element}",
                    style: TextStyle(
                    fontSize: blockWidth * 2,
                    color: Color(0xffbb5e1e),
                    ),
                  ),
                ),
              ),
            ],
         ),
        ],
      ),
    );
  }
}

// This Class shows the Payment Option

class UserMenuTwo extends StatefulWidget {
  
  @override
  _UserMenuTwoState createState() => _UserMenuTwoState();
}

class _UserMenuTwoState extends State<UserMenuTwo> {
  @override
  Widget build(BuildContext context) {
    var wTH = MediaQuery.of(context).size.width;
    var blockWidth = wTH / 100;

    return Container(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget> [
          Row(
            children: <Widget> [
              Padding(
                padding: EdgeInsets.fromLTRB(blockWidth * 2,0,0,0),
                child: Text(
                  "Payment",
                  style: TextStyle(
                    fontSize: blockWidth * 3,
                    fontWeight: FontWeight.bold,
                    color: Color(0xffbb5e1e),
                  ),
                ),
              ),
            ],
         ),
          Row(
            children: <Widget> [
              Padding(
                padding: EdgeInsets.fromLTRB(0,0,blockWidth * 5,0),
                child: Text(
                  "Cash on Delivery",
                  style: TextStyle(
                    fontSize: blockWidth * 2,
                    color: Color(0xffbb5e1e),
                  ),
                ),
              ),
            ],
         ),
          
        ],
      ),
    );
  }
}

// This Class shows the Order Button (Place Order)

class OrderButton extends StatefulWidget {
  @override
  _OrderButtonState createState() => _OrderButtonState();
}

class _OrderButtonState extends State<OrderButton> {
  @override
  Widget build(BuildContext context) {
    var wTH = MediaQuery.of(context).size.width;
    var hTH = MediaQuery.of(context).size.height;
    var blockWidth = wTH / 100;
    var blockHeight = hTH / 100;

    return Card(
      color: Colors.white,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget> [
          Padding(
            padding: EdgeInsets.fromLTRB(0, blockHeight * 0.8, 0, blockHeight * 1.2),
            child: SizedBox(
              width: blockWidth * 25,
              height: blockHeight * 5,
              child: RaisedButton(
                onPressed: (){
                  print("Place Order");
                },
                textColor: Colors.white,
                color: Color(0xffbb5e1e),
                child: Center(
                  child: Text(
                    'Place Order',
                    style: TextStyle(
                      fontSize: blockWidth * 3,
                      fontFamily: 'NunitoSansSemiBold',
                    ),
                  ),
                ),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(blockWidth * 6)
                ),
              ),
            ),
          ),  
        ],
      ),      
    );
  }
}