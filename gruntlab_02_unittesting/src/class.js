/**
 * Allows for more easily usable inheritance in Javascript to closer mimic
 * the OOP approach of AS3. It allows to extend an already existing object (doesn't have to be of Class type, as long as it's got prototype!)
 * and adds a "super" reference to the super class.<br />
 * Any methods you create in the prototype of the current class will overwrite the methods in the base class. You can still reference these by using the "super" object.
 * 
 * @class Class
 * @module Utils
 * @constructor 
 * @example

 *      // Base class construct function
 *      Human = function() {
 *          this.name = "Human";
 *          console.log("Construct Human");
 *      }
 *      
 *      Class.constructor(Human);
 *      
 *      Human.prototype.walk = function() 
 *      {
 *          console.log("Human walking");
 *      }
 *      
 *      Human.prototype.eat = function() 
 *      {
 *          console.log("Human eating");
 *      }
 *      
 *      
 *      // Super class construct function
 *      Superhero = function() {
 *          // Call the super constructor
 *          this.super();
 *          // Note: You can use arguments here and the scope
 *          // will be translated as "this"
 *      
 *          this.name = "Superhero";
 *          console.log("Construct Superhero");
 *      }
 *      
 *      // Setup class and extend Human
 *      Class.constructor(Superhero).extends(Human);
 *      
 *      // Overwrite walk
 *      Superhero.prototype.walk = function() {
 *          console.log("Superhero walking!");
 *      
 *          // Call on the super method
 *          this.super.walk();
 *          // Note: You can use arguments here and the scope
 *          // will be translated as "this"
 *      };
 *      
 *      Superhero.prototype.fly = function() {
 *          console.log("Superhero flying!");
 *      };
 *      
 *      
 *      
 *      // Yep... you heard me! Equal to superhero! Deal with it!
 *      var carl = new Superhero();
 *      // Construct Human
 *      // Construct SuperHero
 *      
 *      carl.walk();
 *      // Superhero walking!
 *      // Human walking
 *      
 *      carl.fly();
 *      // Superhero flying!
 *      
 *      carl.eat();
 *      // Human eating 
 */
Class = function() { };
Class.prototype.constructor = Class;



/**
 * Sets up a function as a class and gives it all the class methods (like extends)
 * 
 * @method constructor
 * @param {Object} target The base class (or super class) that the current class wants to extend
 * @chainable
 * @static
 * @example
 *      var myClass = function() { };
 *      Class.constructor(myClass);
 */
Class.constructor = function(target) 
{
    target.prototype.constructor = target;
    target.extends = Class.prototype.extends;
    return target;
}


/**
 * Extends an object. This stores a reference to all super methods in the super
 * object, and set's all base methods to the super class.
 * 
 * @method extends
 * @param {Object} baseClass The base class (or super class) that the current class wants to extend
 * @example
 *      var myClass = function() { };
 *      Class.constructor(myClass).extends(superClass);
 * @example
 *      var myClass = function() { };
 *      Class.constructor(myClass);
 *      myClass.extends(superClass);
 */
Class.prototype.extends = function(baseClass)
{
    var target = this;
    var overridden = { };
    var constr = baseClass.prototype.constructor;

    var superObject = function() {
        return function() { constr.call(this, arguments); }
    }();

    if(baseClass.prototype.super)
        superObject.super = baseClass.prototype.super;

    var k;

    var validate = function(name, baseClass)
    {
        return name != "super" &&
            baseClass.prototype[name] !== undefined &&
            typeof baseClass.prototype[name] === "function";
    }

    for(k in baseClass.prototype)
    {
        if(validate(k, baseClass))
        {
            if(validate(k, target))
                overridden[k] = target.prototype[k];

            superObject[k] = function() {
                var f = baseClass.prototype[k];
                return function() {
                    f.call(this, arguments);
                }
            }();
        }
    }

    target.prototype = Object.create(baseClass.prototype);
    target.prototype.constructor = target;

    for(k in overridden)
        target[k] = overridden[k];

    target.prototype.super = superObject; 
}