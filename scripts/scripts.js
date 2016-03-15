var adj;
var timekeeper;
var nav, title, about, portfolio, contact;
var aboutLink, portfolioLink, contactLink;

// Adds some adjectives that describe me
function Adjectives(elementID){
	this.adjectives = ["dedicated", "ambitious", "creative", "hard-working", "reliable", 
			"flexible", "motivated", "enthusiastic", "diligent", "responsible"];
	this.element = document.getElementById(elementID);
	this.currentAdj = 0;
	
	this.updateAdjective = function(){
		var randomNum = parseInt(Math.random() * this.adjectives.length);
		
		while(randomNum === this.currentAdj){
			randomNum = parseInt(Math.random() * this.adjectives.length);
		}
		this.currentAdj = randomNum;
		
		this.element.innerHTML = this.adjectives[randomNum];
	}
}

// Keeps track of how old I am
function Timekeeper(date, secElementID, yearElementID){
	this.date1 = date;
	this.secElement = document.getElementById(secElementID);
	this.yearElement = document.getElementById(yearElementID);
	
	this.getDate = function(){
		this.date2 = new Date();
	}
	
	// Count the number of years that have elapsed
	this.calcYears = function(){
		this.numYears = (this.date2.getYear() - this.date1.getYear()) - 1;
		if(this.date2.getMonth() > this.date1.getMonth()){
			this.numYears++;
		}
		else if(this.date2.getMonth() === this.date1.getMonth()){
			if(this.date2.getDate() > this.date1.getDate()){
				this.numYears++;
			}
			else if(this.date2.getDate() === this.date1.getDate()){
				if(this.date2.getHours() > this.date1.getHours()){
					this.numYears++;
				}
				else if(this.date2.getHours() === this.date1.getHours()){
					if(this.date2.getMinutes() > this.date1.getMinutes()){
						this.numYears++;
					}
					else if(this.date2.getMinutes === this.date1.getMinutes()){
						if(this.date2.getSeconds() > this.date1.getSeconds()){
							this.numYears++;
						}
					}
				}
			}
		}
	}
	
	// Count the number of seconds that have elapsed
	this.calcSeconds = function(){
		this.numSeconds = this.date2.getTime() - this.date1.getTime();
		this.numSeconds = parseInt(this.numSeconds / 1000);
	}
	
	// Update the html element 
	this.updateTime = function(){
		this.getDate();
		this.calcYears();
		this.calcSeconds();
		
		this.secElement.innerHTML = commafy(this.numSeconds);
		this.yearElement.innerHTML = this.numYears;
	}
}

// Convert integer to string with commas
function commafy(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function timekeeperCallback(){
	timekeeper.getDate();
	timekeeper.updateTime();
}

function adjectivesCallback(){
	adj.updateAdjective();
}

window.onload = function(){
	adj = new Adjectives("desc");
	adj.updateAdjective();
	setInterval(adjectivesCallback, 1440);
	
	timekeeper = new Timekeeper(new Date(1994, 2, 17, 5, 33, 0, 0), "age-secs", "age-years");
	timekeeper.updateTime();
	setInterval(timekeeperCallback, 1000);
	
	title = document.getElementById("title-page");
	about = document.getElementById("about-me");
	portfolio = document.getElementById("portfolio");
	contact = document.getElementById("contact");
	nav = document.getElementById("nav");
	
	aboutLink = document.getElementById("about-link");
	portfolioLink = document.getElementById("portfolio-link");
	contactLink = document.getElementById("contact-link");
}

function menu(){
	var titleHeight = title.scrollHeight;
	var aboutHeight = about.scrollHeight;
	var portfolioHeight = portfolio.scrollHeight;
	var contactHeight = contact.scrollHeight;
	var navHeight = nav.scrollHeight;
	var scroll = window.scrollY;
	
	console.log(window.innerHeight);
	
	// Light up different nav links depending on where the page is scrolled
	// Contacts page
	if(scroll === titleHeight + aboutHeight + portfolioHeight + contactHeight - window.innerHeight){
		aboutLink.className = "";
		portfolioLink.className = "";
		contactLink.className = "active";
	}
	// Portfolio page
	else if(scroll > titleHeight + aboutHeight - navHeight){
		aboutLink.className = "";
		portfolioLink.className = "active";
		contactLink.className = "";
	}
	// About me page
	else if(scroll > titleHeight - navHeight){
		aboutLink.className = "active";
		portfolioLink.className = "";
		contactLink.className = "";
		
		// Attach the nav bar to the top as the page is scrolled down
		nav.className = "scrolled"
	}
	// Title page - light up none of the links and unattach the nav bar from the top of the page
	else{
		aboutLink.className = "";
		portfolioLink.className = "";
		contactLink.className = "";

		nav.className = "";
	}
}