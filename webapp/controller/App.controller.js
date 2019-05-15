sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/base/Log"
], function (Controller, Log) {
	"use strict";

	return Controller.extend("opensap.movies.controller.App", {
		onInit: function () {
			Log.info(" Controller inicializated: ---------------");
		},
		onBeforeRendering: function()
		{
			Log.info(" The app will be render --------------");
		},
		onAfterRendering:  function()
		{
			Log.info(" The app has been rendered --------------");
		},
		onPress: function(myString, oEvent)
		{
			Log.info(" Mesaje de prueba ----------------------------");	
			sap.ui.require(["sap/m/MessageToast"], function(oMessage, nOptions){
				oMessage.show(" Searching movie..." + myString);
			});
		},
		onExit: function()
		{
			Log.info(" Controller will shortly be destroyed --------------");
		}
	});
});