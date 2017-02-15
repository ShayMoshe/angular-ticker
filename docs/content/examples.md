# Examples
<angular-ticker data-angular-ticker={{vm.tickerConfig}}></angular-ticker>
<br>
<angular-ticker data-angular-ticker={{vm.tickerConfig2}}></angular-ticker>
<br>
<angular-ticker data-angular-ticker={{vm.tickerConfig3}}></angular-ticker>
<br>
## Dynamic 
 <form ng-submit="vm.submit()" class="form-inline ng-pristine ng-valid">
      <div class="form-group">
        <label class="sr-only" for="msgInput">Message</label>
        <input required type="text" ng-model="vm.form.message" class="form-control" id="msgInput" placeholder="Enter Message">
      </div>
      <div class="form-group">
        <label class="sr-only" for="linkInput">Read more Link</label>
        <input type="text" class="form-control" ng-model="vm.form.link" id="linkInput" placeholder="Read more Link (Optional)">
      </div>
	   <div class="radio">
        <label>
          <input required  type="radio" name="optionsRadios" id="info" ng-model="vm.form.type" value="info" checked="true">
          Info
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="optionsRadios" id="error" ng-model="vm.form.type" value="error">
          Error
        </label>
      </div>
      <button type="submit" id="submit" value="Submit" class="btn btn-default" ng-submit="vm.submit()">Add</button>
    </form>
<angular-ticker data-angular-ticker={{vm.tickerConfigDynamic}}></angular-ticker>