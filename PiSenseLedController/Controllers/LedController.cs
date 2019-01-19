using Microsoft.AspNetCore.Mvc;
using PiSenseLedController.DataAccess;
using PiSenseLedController.Helpers;
using PiSenseLedController.Services;
using PiSenseLedController.ViewModels;

namespace PiSenseLedController.Controllers
{
    [Route("api/[controller]")]
    public class LedController : Controller
    {
        private IAccessLedDataStorage _storage;
        private IAmAnAzureMessageService _messageService;

        public LedController(IAccessLedDataStorage storage, IAmAnAzureMessageService messageService)
        {
            _storage = storage;
            _messageService = messageService;
        }

        [HttpGet("[action]")]
        public LedViewModel Model()
        {
            return _storage.ReadLedData().ToLedViewModel();
        }

        [HttpPost("[action]")]
        public IActionResult Update([FromBody]LedViewModel model)
        {
            var piLedModel = model.ToPiLedModel();
            _storage.WriteLedData(piLedModel);
            _messageService.NotifyPiOfLedUpdate("UPDATE_LED");
            return Ok();
        }
    }
}
