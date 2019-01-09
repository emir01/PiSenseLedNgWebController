using System.Collections.Generic;

namespace PiSenseLedController.ViewModels
{
    public class LedViewModel
    {
        public List<List<int>> LedMatrix { get; set; }

        public int MatrixSize { get; set; }
    }
}
