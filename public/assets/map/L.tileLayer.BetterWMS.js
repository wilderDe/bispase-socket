L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.getFeatureInfo, this);
  },
  onRemove: function (map) {
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.getFeatureInfo, this);
  },
  getFeatureInfo: function (evt) {
    console.log('este click '+evt.latlng);
    var url = this.getFeatureInfoUrl(evt.latlng)
    
   /*  $.ajax({
      url: url,
      success: function (data, status, xhr) {
        var err = typeof data === 'string' ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);  
      }
    }); */
    return url;
  },
  getFeatureInfoUrl: function (latlng) {
    console.log("utiliza estes");
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
        size = this._map.getSize(),
        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: this.wmsParams.styles,
          transparent: this.wmsParams.transparent,
          version: this.wmsParams.version,      
          format: this.wmsParams.format,
          bbox: this._map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: this.wmsParams.layers,
          query_layers: this.wmsParams.layers,
          info_format: 'text/html'
        };
    params[params.version === '1.3.0' ? 'i' : 'x'] = Math.round(point.x);  // rounding added
    params[params.version === '1.3.0' ? 'j' : 'y'] = Math.round(point.y);  // rounding added
    
    var url = this._url + L.Util.getParamString(params, this._url, true);
    
    if(typeof this.wmsParams.proxy !== "undefined") {
      console.log(this.wmsParams.proxy, this.wmsParams.proxyParamName);
      if(typeof this.wmsParams.proxyParamName == "undefined") { // corrected, was !==
        this.wmsParams.proxyParamName = 'url';
      }
      _proxy = this.wmsParams.proxy + '?' + this.wmsParams.proxyParamName + '=';
      url = _proxy + encodeURIComponent(url);
    } 
    return url;
  },
  showGetFeatureInfo: function (err, latlng, content) {
    if (err) { console.log(err); return; }
    L.popup({ maxWidth: 800})
      .setLatLng(latlng)
      .setContent(content)
      .openOn(this._map);
  }
});

L.tileLayer.betterWms = function (url, options) {
  return new L.TileLayer.BetterWMS(url, options);  
};