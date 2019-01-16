using PiSenseLedController.Models;

namespace PiSenseLedController.DataAccess
{
    public interface IAccessLedDataStorage
    {
        PiLedModel ReadLedData();

        void WriteLedData();

    }
}