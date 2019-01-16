using Microsoft.AspNetCore.Mvc;
using PiSenseLedController.DataAccess;
using PiSenseLedController.Helpers;
using PiSenseLedController.ViewModels;

namespace PiSenseLedController.Controllers
{
    [Route("api/[controller]")]
    public class LedController : Controller
    {
        private IAccessLedDataStorage _storage;

        public LedController(IAccessLedDataStorage storage)
        {
            _storage = storage;
        }

        [HttpGet("[action]")]
        public LedViewModel Model()
        {
            return _storage.ReadLedData().ToLedViewModel();
        }

        [HttpPost("[action]")]
        public IActionResult Update([FromBody]LedViewModel model)
        {
            return Ok();
        }
    }
}
