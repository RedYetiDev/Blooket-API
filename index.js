class blooket {
  constructor() {
    this.socket = null
    this.pin = null
    this.mode = null
    this.checkgame = this.checkgame.bind(this)
    this.modify = this.modify.bind(this)
    this.select = this.select.bind(this)
    this.socketcheck = this.socketcheck.bind(this)
    this.changescore = this.changescore.bind(this)
    this.glitch = this.glitch.bind(this)
    this.glitchplayers = this.glitchplayers.bind(this)
    this.raceplace = this.raceplace.bind(this)
    this.getstats = this.getstats.bind(this)
  }
  async checkgame() {
    console.log(this)
    this.pin = document.getElementById("pin").value
    this.mode = document.getElementById("mode").value
    console.log(this)
    $("#root").fadeOut()
    ReactDOM.render((<div id="loader"></div>), document.getElementById("main"))
    if (pin == '') {
      alert("Pin cannot be blank!")
      location.reload()
    }
    var socket = await this.socketcheck()
    console.log(socket)
    this.socket = new WebSocket(socket.url)
    this.select()
  }
  select() {
     var menu = (
       <div class="container">
         <button onClick={this.modify} class="btn success">Modify score/powerups.</button>
         <button onClick={this.getstats} class="btn success">Get Stats</button>
       </div>
     );
     if (this.mode == "factory") {
       var menu = (
         <div class="container">
           <button onClick={this.modify} class="btn success">Modify score.</button>
           <button onClick={this.glitch} class="btn success">Glitches.</button>
           <button onClick={this.getstats} class="btn success">Get Stats</button>
         </div>
       );
     } else if (this.mode == "race") {
       var menu = (
         <div class="container">
           <button onClick={this.raceplace} class="btn success">Race Place</button>
           <button onClick={this.getstats} class="btn success">Get Stats</button>
         </div>
       );
     }
     $("#main").fadeOut()
     setTimeout(function () {
       ReactDOM.render(menu, document.getElementById("main"))
     }, 100);
     $("#main").fadeIn()
  }
  getstats() {
    var socket = this.socket
    socket.send('{"t":"d","d":{"r":3,"a":"q","b":{"p":"/' + pin + '/c","h":""}}}')
    socket.onmessage = function(data) {
      console.log(data)
      var data = JSON.parse(data.data)
      if (data.d.b.p) {
        socket.onmessage = null
        var data = data.d.b.d
        var stats = []
        for (var i in data) {
          stats.push(
            <div class="card">
              <img src={"https://res.cloudinary.com/blooket/image/upload/v1556829562/Blooks/" + data[i][Object.keys(data[i])[0]] + ".svg"} alt="Avatar" id="card"></img>
              <div class="container">
                <h4><b>Name: {i}</b></h4>
                <p>Score: {parseInt(data[i][Object.keys(data[i])[Object.keys(data[i]).length - 1]]) || 0}</p>
              </div>
            </div>
            )
        }
        var statrender = (
          <div class="container">
          {stats}
          <button name="gamecheck" onClick={this.select}>Go back</button>
          </div>
        )
        console.log(statrender)
        ReactDOM.render(statrender, document.getElementById("main"))
      }
    }
  }
  changescore() {
    animal = document.getElementById("animal").value
    name = document.getElementById("name").value
    var socket = this.socket
    if (this.mode == "cafe" || this.mode == "factory") {
      var score = document.getElementById("score").value
      socket.send('{"t":"d","d":{"r":3,"a":"p","b":{"p":"/' + this.pin + '/c/' + name + '","d":{"b":"' + animal +'","ca":' + score + '}}}}')
    } else if (this.mode == "goldquest") {
     var score = document.getElementById("score").value
      socket.send('{"t":"d","d":{"r":3,"a":"p","b":{"p":"/' + this.pin + '/c/' + name + '","d":{"b":"' + animal +'","g":' + score + '}}}}')
      socket.send('{"t":"d","d":{"r":4,"a":"p","b":{"p":"/' + this.pin + '/c/' + name + '","d":{"b":"' + animal + '","g":' + score + ',"at":"' + name + ':' + animal + ':swap"}}}}')
    } else if (this.mode == "race") {
      var place = document.getElementById("place").value
      socket.send('{"t":"d","d":{"r":3,"a":"p","b":{"p":"/' + this.pin + '/c/' + name + '","d":{"b":"' + animal + '","pr":' + place + '}}}}')
    }
    $("#main").fadeOut().hide("300").fadeIn()
  }
  glitchplayers() {
    var socket = this.socket
    glitchtype = document.getElementById("glitchtype").value
    animal = document.getElementById("animal").value
    name = document.getElementById("name").value
    socket.send('{"t":"d","d":{"r":3,"a":"p","b":{"p":"/' + this.pin + '/act","d":{"b":"' + animal + '","g":"' + glitchtype + '","n":"' + name + '"}}}}')
  }
  glitch() {
    const glitchform = (
      <div class="container">
        <label for="pin">Enter name</label>
        <input type="text" id="name" name="name" placeholder="The name.." />

        <label for="picture">Player animal:</label>
        <select id="animal" name="pic">
          <option value="Chick" name="Chick">Chick</option>
          <option value="Chicken" name="Chicken">Chicken</option>
          <option value="Cow" name="Cow">Cow</option>
          <option value="Goat" name="Goat">Goat</option>
          <option value="Horse" name="Horse">Horse</option>
          <option value="Pig" name="Pig">Pig</option>
          <option value="Sheep" name="Sheep">Sheep</option>
          <option value="Duck" name="Duck">Duck</option>
          <option value="Dog" name="Dog">Dog</option>
          <option value="Cat" name="Cat">Cat</option>
          <option value="Rabbit" name="Rabbit">Rabbit</option>
          <option value="Goldfish" name="Goldfish">Goldfish</option>
          <option value="Hamster" name="Hamster">Hamster</option>
          <option value="Turtle" name="Turtle">Turtle</option>
          <option value="Kitten" name="Kitten">Kitten</option>
          <option value="Puppy" name="Puppy">Puppy</option>
          <option value="Bear" name="Bear">Bear</option>
          <option value="Moose" name="Moose">Moose</option>
          <option value="Fox" name="Fox">Fox</option>
          <option value="Raccoon" name="Raccoon">Raccoon</option>
          <option value="Squirrel" name="Squirrel">Squirrel</option>
          <option value="Owl" name="Owl">Owl</option>
          <option value="Hedgehog" name="Hedgehog">Hedgehog</option>
          <option value="Baby Penguin" name="Baby Penguin">Baby Penguin</option>
          <option value="Penguin" name="Penguin">Penguin</option>
          <option value="Arctic Fox" name="Arctic Fox">Arctic Fox</option>
          <option value="Snowy Owl" name="Snowy Owl">Snowy Owl</option>
          <option value="Polar Bear" name="Polar Bear">Polar Bear</option>
          <option value="Arctic Hare" name="Arctic Hare">Arctic Hare</option>
          <option value="Seal" name="Seal">Seal</option>
          <option value="Walrus" name="Walrus">Walrus</option>
          <option value="Tiger" name="Tiger">Tiger</option>
          <option value="Panther" name="Panther">Panther</option>
          <option value="Cockatoo" name="Cockatoo">Cockatoo</option>
          <option value="Orangutan" name="Orangutan">Orangutan</option>
          <option value="Anaconda" name="Anaconda">Anaconda</option>
          <option value="Macaw" name="Macaw">Macaw</option>
          <option value="Jaguar" name="Jaguar">Jaguar</option>
          <option value="Capuchin" name="Capuchin">Capuchin</option>
          <option value="Toucan" name="Toucan">Toucan</option>
          <option value="Parrot" name="Parrot">Parrot</option>
          <option value="Elf" name="Elf">Elf</option>
          <option value="Witch" name="Witch">Witch</option>
          <option value="Wizard" name="Wizard">Wizard</option>
          <option value="Fairy" name="Fairy">Fairy</option>
          <option value="Slime Monster" name="Slime Monster">Slime Monster</option>
          <option value="Jester" name="Jester">Jester</option>
          <option value="Dragon" name="Dragon">Dragon</option>
          <option value="Unicorn" name="Unicorn">Unicorn</option>
          <option value="Queen" name="Queen">Queen</option>
          <option value="King" name="King">King</option>
          <option value="Snow Globe" name="Snow Globe">Snow Globe</option>
          <option value="Holiday Gift" name="Holiday Gift">Holiday Gift</option>
          <option value="Hot Chocolate" name="Hot Chocolate">Hot Chocolate</option>
          <option value="Gingerbread Man" name="Gingerbread Man">Gingerbread Man</option>
          <option value="Gingerbread House" name="Gingerbread House">Gingerbread House</option>
          <option value="Holiday Wreath" name="Holiday Wreath">Holiday Wreath</option>
          <option value="Snowman" name="Snowman">Snowman</option>
          <option value="Santa Claus" name="Santa Claus">Santa Claus</option>
          <option value="Two of Spades" name="Two of Spades">Two of Spades</option>
          <option value="Eat Me" name="Eat Me">Eat Me</option>
          <option value="Drink Me" name="Drink Me">Drink Me</option>
          <option value="Alice" name="Alice">Alice</option>
          <option value="Queen of Hearts" name="Queen of Hearts">Queen of Hearts</option>
          <option value="Dormouse" name="Dormouse">Dormouse</option>
          <option value="White Rabbit" name="White Rabbit">White Rabbit</option>
          <option value="Cheshire Cat" name="Cheshire Cat">Cheshire Cat</option>
          <option value="Caterpillar" name="Caterpillar">Caterpillar</option>
          <option value="Mad Hatter" name="Mad Hatter">Mad Hatter</option>
          <option value="King of Hearts" name="King of Hearts">King of Hearts</option>
          <option value="Toast" name="Toast">Toast</option>
          <option value="Cereal" name="Cereal">Cereal</option>
          <option value="Yogurt" name="Yogurt">Yogurt</option>
          <option value="Breakfast Combo" name="Breakfast Combo">Breakfast Combo</option>
          <option value="Orange Juice" name="Orange Juice">Orange Juice</option>
          <option value="Milk" name="Milk">Milk</option>
          <option value="Waffle" name="Waffle">Waffle</option>
          <option value="Pancakes" name="Pancakes">Pancakes</option>
          <option value="French Toast" name="French Toast">French Toast</option>
          <option value="Pizza" name="Pizza">Pizza</option>
          <option value="Sandwich" name="Sandwich">Sandwich</option>
          <option value="Light Blue" name="Light Blue">Light Blue</option>
          <option value="Black" name="Black">Black</option>
          <option value="Red" name="Red">Red</option>
          <option value="Purple" name="Purple">Purple</option>
          <option value="Pink" name="Pink">Pink</option>
          <option value="Orange" name="Orange">Orange</option>
          <option value="Lime" name="Lime">Lime</option>
          <option value="Green" name="Green">Green</option>
          <option value="Teal" name="Teal">Teal</option>
          <option value="Tan" name="Tan">Tan</option>
          <option value="Maroon" name="Maroon">Maroon</option>
          <option value="Gray" name="Gray">Gray</option>
          <option value="Mint" name="Mint">Mint</option>
          <option value="Salmon" name="Salmon">Salmon</option>
          <option value="Burgandy" name="Burgandy">Burgandy</option>
          <option value="Baby Blue" name="Baby Blue">Baby Blue</option>
          <option value="Dust" name="Dust">Dust</option>
          <option value="Brown" name="Brown">Brown</option>
          <option value="Dull Blue" name="Dull Blue">Dull Blue</option>
          <option value="Yellow" name="Yellow">Yellow</option>
          <option value="Blue" name="Blue">Blue</option>
          <option value="Pumpkin" name="Pumpkin">Pumpkin</option>
          <option value="Swamp Monster" name="Swamp Monster">Swamp Monster</option>
          <option value="Frankenstein" name="Frankenstein">Frankenstein</option>
          <option value="Vampire" name="Vampire">Vampire</option>
          <option value="Zombie" name="Zombie">Zombie</option>
          <option value="Mummy" name="Mummy">Mummy</option>
          <option value="Werewolf" name="Werewolf">Werewolf</option>
          <option value="Ghost" name="Ghost">Ghost</option>
          <option value="Spooky Pumpkin" name="Spooky Pumpkin">Spooky Pumpkin</option>
          <option value="Spooky Mummy" name="Spooky Mummy">Spooky Mummy</option>
          <option value="Spooky Ghost" name="Spooky Ghost">Spooky Ghost</option>
          <option value="Toast" name="Toast">Toast</option>
          <option value="Cereal" name="Cereal">Cereal</option>
          <option value="Yogurt" name="Yogurt">Yogurt</option>
          <option value="Orange Juice" name="Orange Juice">Orange Juice</option>
          <option value="Milk" name="Milk">Milk</option>
          <option value="Waffle" name="Waffle">Waffle</option>
          <option value="Pancakes" name="Pancakes">Pancakes</option>
          <option value="French Toast" name="French Toast">French Toast</option>
        </select>
        <label for="Glitch Selection">Place (up to 30):</label>
        <input id="place" type="number"></input>
        <button name="gamecheck" onClick={this.changescore}>Glitch</button>
        <button name="gamecheck" onClick={this.select}>Go back</button>
      </div>
    );
    $("#main").fadeOut()
    setTimeout(function () {
      ReactDOM.render(glitchform, document.getElementById("main"))
    }, 100);
    $("#main").fadeIn()
  }
  raceplace() {
    const raceform = (
      <div class="container">
        <label for="pin">Enter name</label>
        <input type="text" id="name" name="name" placeholder="The name.." />

        <label for="picture">Player animal:</label>
        <select id="animal" name="pic">
          <option value="Chick" name="Chick">Chick</option>
          <option value="Chicken" name="Chicken">Chicken</option>
          <option value="Cow" name="Cow">Cow</option>
          <option value="Goat" name="Goat">Goat</option>
          <option value="Horse" name="Horse">Horse</option>
          <option value="Pig" name="Pig">Pig</option>
          <option value="Sheep" name="Sheep">Sheep</option>
          <option value="Duck" name="Duck">Duck</option>
          <option value="Dog" name="Dog">Dog</option>
          <option value="Cat" name="Cat">Cat</option>
          <option value="Rabbit" name="Rabbit">Rabbit</option>
          <option value="Goldfish" name="Goldfish">Goldfish</option>
          <option value="Hamster" name="Hamster">Hamster</option>
          <option value="Turtle" name="Turtle">Turtle</option>
          <option value="Kitten" name="Kitten">Kitten</option>
          <option value="Puppy" name="Puppy">Puppy</option>
          <option value="Bear" name="Bear">Bear</option>
          <option value="Moose" name="Moose">Moose</option>
          <option value="Fox" name="Fox">Fox</option>
          <option value="Raccoon" name="Raccoon">Raccoon</option>
          <option value="Squirrel" name="Squirrel">Squirrel</option>
          <option value="Owl" name="Owl">Owl</option>
          <option value="Hedgehog" name="Hedgehog">Hedgehog</option>
          <option value="Baby Penguin" name="Baby Penguin">Baby Penguin</option>
          <option value="Penguin" name="Penguin">Penguin</option>
          <option value="Arctic Fox" name="Arctic Fox">Arctic Fox</option>
          <option value="Snowy Owl" name="Snowy Owl">Snowy Owl</option>
          <option value="Polar Bear" name="Polar Bear">Polar Bear</option>
          <option value="Arctic Hare" name="Arctic Hare">Arctic Hare</option>
          <option value="Seal" name="Seal">Seal</option>
          <option value="Walrus" name="Walrus">Walrus</option>
          <option value="Tiger" name="Tiger">Tiger</option>
          <option value="Panther" name="Panther">Panther</option>
          <option value="Cockatoo" name="Cockatoo">Cockatoo</option>
          <option value="Orangutan" name="Orangutan">Orangutan</option>
          <option value="Anaconda" name="Anaconda">Anaconda</option>
          <option value="Macaw" name="Macaw">Macaw</option>
          <option value="Jaguar" name="Jaguar">Jaguar</option>
          <option value="Capuchin" name="Capuchin">Capuchin</option>
          <option value="Toucan" name="Toucan">Toucan</option>
          <option value="Parrot" name="Parrot">Parrot</option>
          <option value="Elf" name="Elf">Elf</option>
          <option value="Witch" name="Witch">Witch</option>
          <option value="Wizard" name="Wizard">Wizard</option>
          <option value="Fairy" name="Fairy">Fairy</option>
          <option value="Slime Monster" name="Slime Monster">Slime Monster</option>
          <option value="Jester" name="Jester">Jester</option>
          <option value="Dragon" name="Dragon">Dragon</option>
          <option value="Unicorn" name="Unicorn">Unicorn</option>
          <option value="Queen" name="Queen">Queen</option>
          <option value="King" name="King">King</option>
          <option value="Snow Globe" name="Snow Globe">Snow Globe</option>
          <option value="Holiday Gift" name="Holiday Gift">Holiday Gift</option>
          <option value="Hot Chocolate" name="Hot Chocolate">Hot Chocolate</option>
          <option value="Gingerbread Man" name="Gingerbread Man">Gingerbread Man</option>
          <option value="Gingerbread House" name="Gingerbread House">Gingerbread House</option>
          <option value="Holiday Wreath" name="Holiday Wreath">Holiday Wreath</option>
          <option value="Snowman" name="Snowman">Snowman</option>
          <option value="Santa Claus" name="Santa Claus">Santa Claus</option>
          <option value="Two of Spades" name="Two of Spades">Two of Spades</option>
          <option value="Eat Me" name="Eat Me">Eat Me</option>
          <option value="Drink Me" name="Drink Me">Drink Me</option>
          <option value="Alice" name="Alice">Alice</option>
          <option value="Queen of Hearts" name="Queen of Hearts">Queen of Hearts</option>
          <option value="Dormouse" name="Dormouse">Dormouse</option>
          <option value="White Rabbit" name="White Rabbit">White Rabbit</option>
          <option value="Cheshire Cat" name="Cheshire Cat">Cheshire Cat</option>
          <option value="Caterpillar" name="Caterpillar">Caterpillar</option>
          <option value="Mad Hatter" name="Mad Hatter">Mad Hatter</option>
          <option value="King of Hearts" name="King of Hearts">King of Hearts</option>
          <option value="Toast" name="Toast">Toast</option>
          <option value="Cereal" name="Cereal">Cereal</option>
          <option value="Yogurt" name="Yogurt">Yogurt</option>
          <option value="Breakfast Combo" name="Breakfast Combo">Breakfast Combo</option>
          <option value="Orange Juice" name="Orange Juice">Orange Juice</option>
          <option value="Milk" name="Milk">Milk</option>
          <option value="Waffle" name="Waffle">Waffle</option>
          <option value="Pancakes" name="Pancakes">Pancakes</option>
          <option value="French Toast" name="French Toast">French Toast</option>
          <option value="Pizza" name="Pizza">Pizza</option>
          <option value="Sandwich" name="Sandwich">Sandwich</option>
          <option value="Light Blue" name="Light Blue">Light Blue</option>
          <option value="Black" name="Black">Black</option>
          <option value="Red" name="Red">Red</option>
          <option value="Purple" name="Purple">Purple</option>
          <option value="Pink" name="Pink">Pink</option>
          <option value="Orange" name="Orange">Orange</option>
          <option value="Lime" name="Lime">Lime</option>
          <option value="Green" name="Green">Green</option>
          <option value="Teal" name="Teal">Teal</option>
          <option value="Tan" name="Tan">Tan</option>
          <option value="Maroon" name="Maroon">Maroon</option>
          <option value="Gray" name="Gray">Gray</option>
          <option value="Mint" name="Mint">Mint</option>
          <option value="Salmon" name="Salmon">Salmon</option>
          <option value="Burgandy" name="Burgandy">Burgandy</option>
          <option value="Baby Blue" name="Baby Blue">Baby Blue</option>
          <option value="Dust" name="Dust">Dust</option>
          <option value="Brown" name="Brown">Brown</option>
          <option value="Dull Blue" name="Dull Blue">Dull Blue</option>
          <option value="Yellow" name="Yellow">Yellow</option>
          <option value="Blue" name="Blue">Blue</option>
          <option value="Pumpkin" name="Pumpkin">Pumpkin</option>
          <option value="Swamp Monster" name="Swamp Monster">Swamp Monster</option>
          <option value="Frankenstein" name="Frankenstein">Frankenstein</option>
          <option value="Vampire" name="Vampire">Vampire</option>
          <option value="Zombie" name="Zombie">Zombie</option>
          <option value="Mummy" name="Mummy">Mummy</option>
          <option value="Werewolf" name="Werewolf">Werewolf</option>
          <option value="Ghost" name="Ghost">Ghost</option>
          <option value="Spooky Pumpkin" name="Spooky Pumpkin">Spooky Pumpkin</option>
          <option value="Spooky Mummy" name="Spooky Mummy">Spooky Mummy</option>
          <option value="Spooky Ghost" name="Spooky Ghost">Spooky Ghost</option>
          <option value="Toast" name="Toast">Toast</option>
          <option value="Cereal" name="Cereal">Cereal</option>
          <option value="Yogurt" name="Yogurt">Yogurt</option>
          <option value="Orange Juice" name="Orange Juice">Orange Juice</option>
          <option value="Milk" name="Milk">Milk</option>
          <option value="Waffle" name="Waffle">Waffle</option>
          <option value="Pancakes" name="Pancakes">Pancakes</option>
          <option value="French Toast" name="French Toast">French Toast</option>
        </select>
        <input type="number" id="place" name="score" placeholder="New place" />
        <button name="gamecheck" onClick={this.changescore}>Modify score</button>
        <button name="gamecheck" onClick={this.select}>Go back</button>
      </div>
    );
    ReactDOM.render(raceform, document.getElementById('main'));
  }
  modify() {
    const change = (
      <div class="container">
        <label for="pin">Enter name</label>
        <input type="text" id="name" name="name" placeholder="The name.." />

        <label for="picture">Player animal:</label>
        <select id="animal" name="pic">
          <option value="Chick" name="Chick">Chick</option>
          <option value="Chicken" name="Chicken">Chicken</option>
          <option value="Cow" name="Cow">Cow</option>
          <option value="Goat" name="Goat">Goat</option>
          <option value="Horse" name="Horse">Horse</option>
          <option value="Pig" name="Pig">Pig</option>
          <option value="Sheep" name="Sheep">Sheep</option>
          <option value="Duck" name="Duck">Duck</option>
          <option value="Dog" name="Dog">Dog</option>
          <option value="Cat" name="Cat">Cat</option>
          <option value="Rabbit" name="Rabbit">Rabbit</option>
          <option value="Goldfish" name="Goldfish">Goldfish</option>
          <option value="Hamster" name="Hamster">Hamster</option>
          <option value="Turtle" name="Turtle">Turtle</option>
          <option value="Kitten" name="Kitten">Kitten</option>
          <option value="Puppy" name="Puppy">Puppy</option>
          <option value="Bear" name="Bear">Bear</option>
          <option value="Moose" name="Moose">Moose</option>
          <option value="Fox" name="Fox">Fox</option>
          <option value="Raccoon" name="Raccoon">Raccoon</option>
          <option value="Squirrel" name="Squirrel">Squirrel</option>
          <option value="Owl" name="Owl">Owl</option>
          <option value="Hedgehog" name="Hedgehog">Hedgehog</option>
          <option value="Baby Penguin" name="Baby Penguin">Baby Penguin</option>
          <option value="Penguin" name="Penguin">Penguin</option>
          <option value="Arctic Fox" name="Arctic Fox">Arctic Fox</option>
          <option value="Snowy Owl" name="Snowy Owl">Snowy Owl</option>
          <option value="Polar Bear" name="Polar Bear">Polar Bear</option>
          <option value="Arctic Hare" name="Arctic Hare">Arctic Hare</option>
          <option value="Seal" name="Seal">Seal</option>
          <option value="Walrus" name="Walrus">Walrus</option>
          <option value="Tiger" name="Tiger">Tiger</option>
          <option value="Panther" name="Panther">Panther</option>
          <option value="Cockatoo" name="Cockatoo">Cockatoo</option>
          <option value="Orangutan" name="Orangutan">Orangutan</option>
          <option value="Anaconda" name="Anaconda">Anaconda</option>
          <option value="Macaw" name="Macaw">Macaw</option>
          <option value="Jaguar" name="Jaguar">Jaguar</option>
          <option value="Capuchin" name="Capuchin">Capuchin</option>
          <option value="Toucan" name="Toucan">Toucan</option>
          <option value="Parrot" name="Parrot">Parrot</option>
          <option value="Elf" name="Elf">Elf</option>
          <option value="Witch" name="Witch">Witch</option>
          <option value="Wizard" name="Wizard">Wizard</option>
          <option value="Fairy" name="Fairy">Fairy</option>
          <option value="Slime Monster" name="Slime Monster">Slime Monster</option>
          <option value="Jester" name="Jester">Jester</option>
          <option value="Dragon" name="Dragon">Dragon</option>
          <option value="Unicorn" name="Unicorn">Unicorn</option>
          <option value="Queen" name="Queen">Queen</option>
          <option value="King" name="King">King</option>
          <option value="Snow Globe" name="Snow Globe">Snow Globe</option>
          <option value="Holiday Gift" name="Holiday Gift">Holiday Gift</option>
          <option value="Hot Chocolate" name="Hot Chocolate">Hot Chocolate</option>
          <option value="Gingerbread Man" name="Gingerbread Man">Gingerbread Man</option>
          <option value="Gingerbread House" name="Gingerbread House">Gingerbread House</option>
          <option value="Holiday Wreath" name="Holiday Wreath">Holiday Wreath</option>
          <option value="Snowman" name="Snowman">Snowman</option>
          <option value="Santa Claus" name="Santa Claus">Santa Claus</option>
          <option value="Two of Spades" name="Two of Spades">Two of Spades</option>
          <option value="Eat Me" name="Eat Me">Eat Me</option>
          <option value="Drink Me" name="Drink Me">Drink Me</option>
          <option value="Alice" name="Alice">Alice</option>
          <option value="Queen of Hearts" name="Queen of Hearts">Queen of Hearts</option>
          <option value="Dormouse" name="Dormouse">Dormouse</option>
          <option value="White Rabbit" name="White Rabbit">White Rabbit</option>
          <option value="Cheshire Cat" name="Cheshire Cat">Cheshire Cat</option>
          <option value="Caterpillar" name="Caterpillar">Caterpillar</option>
          <option value="Mad Hatter" name="Mad Hatter">Mad Hatter</option>
          <option value="King of Hearts" name="King of Hearts">King of Hearts</option>
          <option value="Toast" name="Toast">Toast</option>
          <option value="Cereal" name="Cereal">Cereal</option>
          <option value="Yogurt" name="Yogurt">Yogurt</option>
          <option value="Breakfast Combo" name="Breakfast Combo">Breakfast Combo</option>
          <option value="Orange Juice" name="Orange Juice">Orange Juice</option>
          <option value="Milk" name="Milk">Milk</option>
          <option value="Waffle" name="Waffle">Waffle</option>
          <option value="Pancakes" name="Pancakes">Pancakes</option>
          <option value="French Toast" name="French Toast">French Toast</option>
          <option value="Pizza" name="Pizza">Pizza</option>
          <option value="Sandwich" name="Sandwich">Sandwich</option>
          <option value="Light Blue" name="Light Blue">Light Blue</option>
          <option value="Black" name="Black">Black</option>
          <option value="Red" name="Red">Red</option>
          <option value="Purple" name="Purple">Purple</option>
          <option value="Pink" name="Pink">Pink</option>
          <option value="Orange" name="Orange">Orange</option>
          <option value="Lime" name="Lime">Lime</option>
          <option value="Green" name="Green">Green</option>
          <option value="Teal" name="Teal">Teal</option>
          <option value="Tan" name="Tan">Tan</option>
          <option value="Maroon" name="Maroon">Maroon</option>
          <option value="Gray" name="Gray">Gray</option>
          <option value="Mint" name="Mint">Mint</option>
          <option value="Salmon" name="Salmon">Salmon</option>
          <option value="Burgandy" name="Burgandy">Burgandy</option>
          <option value="Baby Blue" name="Baby Blue">Baby Blue</option>
          <option value="Dust" name="Dust">Dust</option>
          <option value="Brown" name="Brown">Brown</option>
          <option value="Dull Blue" name="Dull Blue">Dull Blue</option>
          <option value="Yellow" name="Yellow">Yellow</option>
          <option value="Blue" name="Blue">Blue</option>
          <option value="Pumpkin" name="Pumpkin">Pumpkin</option>
          <option value="Swamp Monster" name="Swamp Monster">Swamp Monster</option>
          <option value="Frankenstein" name="Frankenstein">Frankenstein</option>
          <option value="Vampire" name="Vampire">Vampire</option>
          <option value="Zombie" name="Zombie">Zombie</option>
          <option value="Mummy" name="Mummy">Mummy</option>
          <option value="Werewolf" name="Werewolf">Werewolf</option>
          <option value="Ghost" name="Ghost">Ghost</option>
          <option value="Spooky Pumpkin" name="Spooky Pumpkin">Spooky Pumpkin</option>
          <option value="Spooky Mummy" name="Spooky Mummy">Spooky Mummy</option>
          <option value="Spooky Ghost" name="Spooky Ghost">Spooky Ghost</option>
          <option value="Toast" name="Toast">Toast</option>
          <option value="Cereal" name="Cereal">Cereal</option>
          <option value="Yogurt" name="Yogurt">Yogurt</option>
          <option value="Orange Juice" name="Orange Juice">Orange Juice</option>
          <option value="Milk" name="Milk">Milk</option>
          <option value="Waffle" name="Waffle">Waffle</option>
          <option value="Pancakes" name="Pancakes">Pancakes</option>
          <option value="French Toast" name="French Toast">French Toast</option>
        </select>
        <input type="number" id="score" name="score" placeholder="New score" />
        <button name="gamecheck" onClick={this.changescore}>Modify score</button>
        <button name="gamecheck" onClick={this.select}>Go back</button>
      </div>
    );
    $("#main").fadeOut()
    setTimeout(function () {
      ReactDOM.render(change, document.getElementById("main"))
    }, 100);
    $("#main").fadeIn()
  }
  getgame() {
    const getform = (
      <div class="container">
        <label for="pin">Game PIN</label>
        <input type="text" id="pin" name="pin" placeholder="Your pin.." />

        <label for="mode">Game Mode</label>
        <select id="mode" name="mode">
          <option value="goldquest">Gold Quest</option>
          <option value="cafe">Cafe</option>
          <option value="factory">Factory</option>
          <option value="race">Racing</option>
        </select>

        <button name="gamecheck" onClick={this.checkgame}>Check game</button>
      </div>
    );
    ReactDOM.render(getform, document.getElementById("root"))
    $("#root").hide(0).delay(500).fadeIn(1000)
  }
  async socketcheck() {
    return new Promise(resolve => {
    pin = this.pin
    var socket = new WebSocket("wss://s-usc1c-nss-251.firebaseio.com/.ws?v=5&ns=blooket-2020")
    socket.onopen = function() {
      socket.send('{"t":"d","d":{"r":2,"a":"q","b":{"p":"/' + pin + '","h":""}}}')
    }
    socket.onmessage = function(data) {
      data = JSON.parse(data.data)
      if (data.d.b.p == pin) {
        return resolve(socket)
        socket.close()
      }
    }
    var first = setTimeout(function() {
      socket = new WebSocket("wss://s-usc1c-nss-243.firebaseio.com/.ws?v=5&ns=blooket-2021")
      socket.onopen = function() {
        socket.send('{"t":"d","d":{"r":2,"a":"q","b":{"p":"/' + pin + '","h":""}}}')
      }
      socket.onmessage = function(data) {
        data = JSON.parse(data.data)
        if (data.d.b.p == pin) {
          return resolve(socket)
          socket.close()
        }
      }
      var seconds = setTimeout(function () {
          var socket = new WebSocket("wss://s-usc1c-nss-202.firebaseio.com/.ws?v=5&ns=blooket-2023")
          socket.onopen = function() {
            socket.send('{"t":"d","d":{"r":2,"a":"q","b":{"p":"/' + pin + '","h":""}}}')
          }
          socket.onmessage = function(data) {
            data = JSON.parse(data.data)
            if (data.d.b.p == pin) {
              return resolve(socket)
              socket.close()
            }
          }
          var third = setTimeout(function () {
            var socket = new WebSocket("wss://s-usc1c-nss-207.firebaseio.com/.ws?v=5&ns=blooket-2022")
            socket.onopen = function() {
              socket.send('{"t":"d","d":{"r":2,"a":"q","b":{"p":"/' + pin + '","h":""}}}')
            }
            socket.onmessage = function(data) {
              data = JSON.parse(data.data)
              if (data.d.b.p == pin) {
                return resolve(socket)
                socket.close()
              }
            }
            var fourth = setTimeout(function () {
              var socket = new WebSocket("wss://s-usc1c-nss-271.firebaseio.com/.ws?v=5&ns=blooket-2024")
              socket.onopen = function() {
                socket.send('{"t":"d","d":{"r":2,"a":"q","b":{"p":"/' + pin + '","h":""}}}')
              }
              socket.onmessage = function(data) {
                data = JSON.parse(data.data)
                if (data.d.b.p == pin) {
                  return resolve(socket)
                  socket.close()
                }
                }
              setTimeout(function() {
                if (socket.readystate == 3) {
                  alert("Invalid PIN")
                }
              }, 500);
            }, 500);
          }, 500);
        }, 500);
      }, 500);
});
}
}
window.onload = function() {
  document.getElementById("root").style.display = "none"
}
window.onclick = function() {
  $("#begin").fadeOut(500)
  window.onclick = null
  const blook = new blooket()
  blook.getgame()
}
