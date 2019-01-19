namespace PiSenseLedController.Services
{
    public interface IAmAnAzureMessageService
    {
        void NotifyPiOfLedUpdate(string data);
    }
}