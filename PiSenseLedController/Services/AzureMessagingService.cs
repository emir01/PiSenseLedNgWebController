using Microsoft.Azure.Devices;
using PiSenseLedController.Models;
using System.Text;

namespace PiSenseLedController.Services
{
    public class AzureMessagingService : IAmAnAzureMessageService
    {
        private ServiceClient _client;

        private AzureConfigDto _config;

        public AzureMessagingService(AzureConfigDto config)
        {
            _config = config;
            _client = ServiceClient.CreateFromConnectionString(config.DeviceConnectionString);
        }

        public void NotifyPiOfLedUpdate(string data)
        {
            var messageBytes = Encoding.UTF8.GetBytes(data);
            var commandMessage = new Message(messageBytes);
            _client.SendAsync(_config.DeviceId, commandMessage).Wait();
        }
    }
}
