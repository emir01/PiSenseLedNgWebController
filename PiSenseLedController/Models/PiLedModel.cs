using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;
using PiSenseLedController.Constants;
using System;
using System.Collections.Generic;

namespace PiSenseLedController.Models
{
    public class PiLedModel : TableEntity
    {
        public string Matrix { get; set; }

        public int Size { get; set; }

        public PiLedModel()
        {
            PartitionKey = ModelConstants.LedMatrixPartition;
            RowKey = ModelConstants.LedMatrixKey;
        }

        public List<List<int>> MatrixAsList()
        {
            if (!string.IsNullOrWhiteSpace(Matrix))
            {
                object deserialized = JsonConvert.DeserializeObject<List<List<int>>>(Matrix);

                if (deserialized is List<List<int>>)
                {
                    return deserialized as List<List<int>>;
                }
            }

            return new List<List<int>>();
}
    }
}
