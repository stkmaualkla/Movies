sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/base/Log",
	"sap/ui//model/json/JSONModel",
	"../model/formatter" ,
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/UIComponent"
], function (Controller, Log, JSONModel, formatter, Filter, FilterOperator, UIComponent) {
	"use strict";

	return Controller.extend("opensap.movies.controller.App", {
		formatter: formatter,
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
		onPress: function (sValue) {
			sap.ui.require(["sap/m/MessageToast"], function (oMessage) {
			  var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			  oMessage.show(oResourceBundle.getText("search") + sValue);
			}.bind(this));
			
			var sCity = this.byId('city').getValue(),
			  sGenre = this.byId('genre').getSelectedItem().getKey(),
			  oCalendar = this.byId("calendar"),
			  oRowBinding = oCalendar.getBinding("rows"),
			  oFilterGenre,
			  oFilterCity;
			
			// Create filters for genre and city according to user inputs
			oFilterGenre = sGenre ? new Filter("genre", FilterOperator.EQ, sGenre) : null;
			oFilterCity = sCity ? new Filter("info", FilterOperator.Contains, sCity) : null;
			
			// Apply genre filter to calendar rows
			oRowBinding.filter(oFilterGenre);
			
			// Apply city filter to row appointments
			var aRows = oCalendar.getAggregation("rows");
			aRows.forEach(function (oItem) {
			  var oAppointmentsBinding = oItem.getBinding("appointments");
			  oAppointmentsBinding.filter(oFilterCity);
			});
		},
		onAppointmentSelect: function(oAppointment)
		{
			var oContext = oAppointment.getBindingContext("movies"), sPath = oContext.getPath();
			var aParameters = sPath.split("/");
			UIComponent.getRouterFor(this).navTo("Detail", {
				movieId: aParameters[2],
				appointmentId: aParameters[4]
			});
		},
		onExit: function()
		{
			Log.info(" Controller will shortly be destroyed --------------");
		},
		onHello: function()
		{
			sap.m.MessageToast.show('Do you like to go to the movies?');
		},
		to404: function()
		{
			UIComponent.getRouterFor(this).navTo("notFound");
		},
		goHome: function()
		{
			/*var x = new UIComponent(this);
			window.console.log(x);
			x.navTo("Home");*/
			UIComponent.getRouterFor(this).getTargets().display("Home");
			//window.console.log(this.getRouter());
		}
	});
});