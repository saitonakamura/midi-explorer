using System.IO;
using System.Threading.Tasks;
using Core.GuitarPro;
using Xunit;

namespace Tests
{
    public class GpTestsTests
    {
        [Fact]
        public async Task Create()
        {
            var bytes = await File.ReadAllBytesAsync("./../../../test.gp3");
            var gpfile = GP.Create("test.gp3", bytes);
        }

        [Fact]
        public async Task CreateMidi()
        {
            var bytes = await File.ReadAllBytesAsync("./../../../test.gp3");
            var gpfile = GP.Create("test.gp3", bytes);
            var song = new Native.NativeFormat(gpfile);
            var midi = song.toMidi();
            Assert.NotNull(midi);
        }
    }
}
