/* FormComplete Snippet - Antiflicker */
if (!window._zi_fc) {window._zi_fc={}}
window._zi_fc.antiflicker = (formSelector=null, fieldNames=[], fieldRowSelector=null, fieldColumnSelector=null, fallbackTimeout=4000) => {

	// Create and append fc-initial-hide style element to header. 
	this.af = document.createElement('style');
	this.af.id = 'zi-fc-af';
	this.af.innerHTML = '.fc-initial-hide{display:none}';
	document.head.appendChild(this.af);
	
	// If Form Selector Specified, find each form.
	if (formSelector != null) {

		// Locate each form matching selector.
		let Forms = document.querySelectorAll(formSelector);
		for (let i=0; i<Forms.length; i++) {
			
			// Ensure fieldNames is an array.
			if (Array.isArray(fieldNames)) {

				// Locate each field by Name and apply CSS class 'fc-initial-hide'.
				for (let i2=0; i2<fieldNames.length; i2++) {
					let field = Forms[i].querySelector('[name="'+fieldNames[i2]+'"]');
					if (field) {field.classList.add('fc-initial-hide')}
				}

			}
			
			// Locate each field/field container within form with Initial Hide CSS class.
			let fields = Forms[i].querySelectorAll('.fc-initial-hide');
			for (let i2=0; i2<fields.length; i2++) {
				
				// If Column Selector specified, find and hide each field column.
				if (fieldColumnSelector != null) {
					let Column = fields[i2].closest(fieldColumnSelector);
					if (Column) {Column.classList.add('fc-initial-hide')}
				}
				
			}
			
			// If Row Selector specified, find and hide each row where all columns have CSS class 'fc-initial-hide'.
			if (fieldRowSelector != null) {

				// Locate all rows within form that contain atleast 1 element with CSS class 'fc-initial-hide'.
				let Rows = Forms[i].querySelectorAll(`${fieldRowSelector}:has(.fc-initial-hide)`);
				for (let i2=0; i2<Rows.length; i2++) {
					
					// Hide row if total columns equal total columns with CSS class 'fc-initial-hide'.
					if (Rows[i2].querySelectorAll(fieldColumnSelector).length == Rows[i2].querySelectorAll(`${fieldColumnSelector}[class *="fc-initial-hide"]`).length) {Rows[i2].classList.add('fc-initial-hide')}
					
				}

			}

		}

	}

	// Add FormComplete onReady listener to remove 'fc-initial-hide' style element and to allow Form Shortening to take over hidding the fields.
	window._zi_fc.onReady = () => {
		let af = document.getElementById(self.af.id);
		if(af){af.remove()}
	}

	// Set fallback using setTimeout method to remove 'fc-initial-hide' style element after N milliseconds if onReady does not occur first.
	let self = this;
	window._zi_fc.af_fallback = setTimeout(function() {
		let af = document.getElementById(self.af.id);
		if(af){af.remove()}
	}, fallbackTimeout);
	
};

// Configurations
window._zi_fc.antiflicker('form.hs-form-private', ['firstname','lastname', 'phone', 'jobtitle', 'company', 'address'], 'fieldset[class *= "form-columns-"]', 'div[class *="hs-form-field"]', 4000);	
