class TypeWriter {
    constructor(textElement, words, wait = 3000) {
        this.textElement = textElement; // DOM element to be manipulated
        this.words = words; // array of words passed
        this.text = ''; // the "built" text
        this.wordIndex = 0; // element of array we want
        this.wait = parseInt(wait, 10); // wait time 
        this.isDeleting = false;
        this.type();
    }
    type() {
        let current = this.wordIndex % this.words.length;
        let fullText = this.words[current];
        if (this.isDeleting) {
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            this.text = fullText.substring(0, this.text.length + 1);
        }
        this.textElement.html(`<span class="txt">${this.text}</span>`);
        let typeSpeed = 80; // normal type speed for a word
        if (this.isDeleting)
            typeSpeed /= 3;
        if (!this.isDeleting && this.text == fullText) {
            typeSpeed = this.wait; // pause after spelling out word
            this.isDeleting = !this.isDeleting;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = !this.isDeleting;
            this.wordIndex++;
            typeSpeed = 300; // pause before next work
        }
        setTimeout(() => this.type(), typeSpeed);
    }
}

class AltTypeWriter {
    constructor(textElement, word) {
        this.textElement = textElement;
        this.word = word;
        this.text = '';
        this.type();
    }
    type() {
        if (this.text === this.word) {
            document.querySelector('.h-txt-body').style.border = "none";
            return;
        } else {
            this.text = this.word.substring(0, this.text.length + 1);
        }
        this.textElement.html(`<span class="h-txt-body">${this.text}</span>`)
        setTimeout(() => this.type(), 85);
    }
}

export { TypeWriter, AltTypeWriter};