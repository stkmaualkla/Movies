sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("opensap.movies.controller.App", {
		onInit: function () {

		},
		onPress: function(oEvent)
		{
			window.console.log(" OK");
			sap.ui.require(["sap/m/MessageToast"], function(oMessage, nOptions){
				oMessage.show(" Searching movie...");
			});
		}
	});
});