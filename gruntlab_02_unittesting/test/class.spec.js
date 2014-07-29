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



describe("Human", function() {
	
	var instance;

    beforeEach(function() {
        instance = new Human();
    });

    it("should be able to eat a banana", function() {
    	expect(instance.eat("banana")).toEqual("This Human ate a banana");
    });

    it("should not be able to fly", function() {
    	expect(instance.fly()).toEqual("Humans can't fly!");
    });

    it("should be an instance of Human", function() {
        expect(instance instanceof Human).toBeTruthy();
    });

    it("should not be an instance of Superhero", function() {
        expect(instance instanceof Superhero).toBeFalsy();
    });

    it("should not contain a super object", function() {
        expect(instance.super).not.toBeDefined();
    });
});

describe("Superhero", function() {
    
    var instance;

    beforeEach(function() {
        instance = new Superhero();
    });

    it("should be able to eat a banana", function() {
        expect(instance.eat("banana")).toEqual("This Superhero ate a banana");
    });

    it("should be able to fly", function() {
        expect(instance.fly()).toEqual("I am flying!");
    });

    it("should be an instance of human", function() {
        expect(instance instanceof Human).toBeTruthy();
    });

    it("should be an instance of superhero", function() {
        expect(instance instanceof Superhero).toBeTruthy();
    });

    it("should contain a super object", function() {
        expect(instance.super).toBeDefined();
    });
});
