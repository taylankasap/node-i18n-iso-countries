var fs = require("fs"),
    path = require("path");

/*
 * All codes map to ISO 3166-1 alpha-2
 */
var alpha3 = {},
    numeric = {};
/*jslint stupid: true */
fs.readFileSync(path.resolve(__dirname, "codes.csv"), {encoding: "utf8"}).replace(/\r/g, "").split("\n").forEach(function(line) {
	"use strict";
	var s = line.split(";");
	alpha3[s[1]] = s[0];
	numeric[parseInt(s[2], 10)] = s[0];
});
/*jslint stupid: false */

/*
 * @param code Alpha-3 code
 * @return Alpha-2 code or undefined
 */
function alpha3ToAlpha2(code) {
	"use strict";
	return alpha3[code];
}
exports.alpha3ToAlpha2 = alpha3ToAlpha2;

/*
 * @param code Numeric code
 * @return Alpha-2 code or undefined
 */
function numericToAlpha2(code) {
	"use strict";
	return numeric[parseInt(code, 10)];
}
exports.numericToAlpha2 = numericToAlpha2;

/*
 * @param code ISO 3166-1 alpha-2, alpha-3 or numeric code
 * @return ISO 3166-1 alpha-2
 */
function toAlpha2(code) {
        "use strict";
        if (typeof code === "string") {
		if (/^[0-9]*$/.test(code)) {
			return numericToAlpha2(code);
		}
		if (code.length === 2) {
			return code.toUpperCase();
		}
		if(code.length === 3) {
			return alpha3ToAlpha2(code.toUpperCase());
		}
        }
	if (typeof code === "number") {
                return numericToAlpha2(code);
        }
	return undefined;
}
exports.toAlpha2 = toAlpha2;

/*
 * @param code ISO 3166-1 alpha-2, alpha-3 or numeric code
 * @param lang language for country name
 * @return name or undefined
 */
exports.getName = function(code, lang) {
	"use strict";
	try {
		var l = require("./" + lang.toLowerCase());
		return l.i18n()[toAlpha2(code)];
	} catch (err) {
		return undefined;
	}	
};


/*
 * @param lang language for country name
 * @return hash
 */
exports.getNames = function(lang) {
	"use strict";
	try {
		var l = require("./" + lang.toLowerCase());
		return l.i18n();
	} catch (err) {
		return {};
	}
};

