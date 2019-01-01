using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using PiSenseLedController.Constants;
using PiSenseLedController.Models;

namespace PiSenseLedController.DataAccess
{
    public class TableStorageAccess : IAccessLedDataStorage
    {
        private CloudStorageAccount _storageAccount;

        private CloudTableClient _tableClient;

        public TableStorageAccess(AzureConfigDto configDto)
        {
            _storageAccount =
                        new CloudStorageAccount(
                            new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials(
                                configDto.AccountName,
                                configDto.Key), true);

            _tableClient = _storageAccount.CreateCloudTableClient();
        }

        public PiLedModel ReadLedData()
        {
            CloudTable table = _tableClient.GetTableReference(ModelConstants.TableName);

            TableOperation readOperation = TableOperation.Retrieve<PiLedModel>(ModelConstants.LedMatrixPartition, ModelConstants.LedMatrixKey, resolver);

            TableResult result = table.ExecuteAsync(readOperation).Result;

            var piLedResultModel = result.Result as PiLedModel;

            return piLedResultModel;
        }



        EntityResolver<PiLedModel> resolver = (pk, rk, ts, props, etag) =>
        {
            var piLedModel = new PiLedModel()
            {
                ETag = etag,
                Timestamp = ts,
                Matrix = props[nameof(PiLedModel.Matrix).ToLower()].StringValue,
                Size = props[nameof(PiLedModel.Size).ToLower()].Int32Value ?? 0
            };

            return piLedModel;
        };

    }

}
