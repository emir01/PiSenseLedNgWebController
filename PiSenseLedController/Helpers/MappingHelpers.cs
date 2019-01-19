using Newtonsoft.Json;
using PiSenseLedController.Constants;
using PiSenseLedController.Models;
using PiSenseLedController.ViewModels;
using System.Collections.Generic;

namespace PiSenseLedController.Helpers
{
    public static class MappingHelpers
    {
        public static List<List<int>> StringMatrixAsList(string matrix)
        {
            if (!string.IsNullOrWhiteSpace(matrix))
            {
                object deserialized = JsonConvert.DeserializeObject<List<List<int>>>(matrix);

                if (deserialized is List<List<int>>)
                {
                    return deserialized as List<List<int>>;
                }
            }

            return new List<List<int>>();
        }

        public static LedViewModel ToLedViewModel(this PiLedModel model)
        {
            return new LedViewModel()
            {
                LedMatrix = StringMatrixAsList(model.Matrix),
                MatrixSize = model.Size
            };
        }

        public static PiLedModel ToPiLedModel(this LedViewModel viewModel)
        {
            return new PiLedModel()
            {
                PartitionKey = ModelConstants.LedMatrixPartition,
                RowKey = ModelConstants.LedMatrixKey,
                Matrix = JsonConvert.SerializeObject(viewModel.LedMatrix),
                Size = viewModel.MatrixSize
            };
        }
    }

}
