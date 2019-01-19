using Microsoft.WindowsAzure.Storage.Table;
using PiSenseLedController.Constants;

namespace PiSenseLedController.Models
{
    public class PiLedModel : TableEntity
    {
        public string Matrix { get; set; }

        public int Size { get; set; }

        public PiLedModel()
        {
            PartitionKey = AppConstants.LedMatrixPartition;
            RowKey = AppConstants.LedMatrixKey;
        }
}
}
