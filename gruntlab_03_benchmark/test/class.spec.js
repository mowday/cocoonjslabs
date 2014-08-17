Human = function()
{
	this.name = "Human";
};

Class.constructor(Human);

Human.prototype.eat = function(what) 
{
	return "This " + this.name + " ate a " + what;
};

Human.prototype.fly = function() 
{
	return "Humans can't fly!";
};

Superhero = function()
{
	this.name = "Superhero";
};

Class.constructor(Superhero).extends(Human);

Superhero.prototype.fly = function() 
{
	return "I am flying!";
};



describe("Human should", function() {
	
	var instance;

    beforeEach(function() {
        instance = new Human();
    });

    it("be able to eat a banana", function() {
    	expect(instance.eat("banana")).toEqual("This Human ate a banana");
    });

    it("not be able to fly", function() {
    	expect(instance.fly()).toEqual("Humans can't fly!");
    });

    it("be an instance of Human", function() {
        expect(instance instanceof Human).toBeTruthy();
    });

    it("not be an instance of Superhero", function() {
        expect(instance instanceof Superhero).toBeFalsy();
    });

    it("not contain a super object", function() {
        expect(instance.super).not.toBeDefined();
    });
});

describe("Superhero should", function() {
    
    var instance;

    beforeEach(function() {
        instance = new Superhero();
    });

    it("be able to eat a banana", function() {
        expect(instance.eat("banana")).toEqual("This Superhero ate a banana");
    });

    it("be able to fly", function() {
        expect(instance.fly()).toEqual("I am flying!");
    });

    it("be an instance of human", function() {
        expect(instance instanceof Human).toBeTruthy();
    });

    it("be an instance of superhero", function() {
        expect(instance instanceof Superhero).toBeTruthy();
    });

    it("contain a super object", function() {
        expect(instance.super).toBeDefined();
    });
});
