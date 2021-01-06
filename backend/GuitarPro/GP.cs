using System.IO;
using Serilog;

namespace MidiExplorer.GuitarPro
{
    public class GP
    {
        public static GPFile Create(string filename, byte[] content)
        {

            int version = 7;
            string fileEnding = Path.GetExtension(filename);
            if (fileEnding.Equals(".gp3")) version = 3;
            if (fileEnding.Equals(".gp4")) version = 4;
            if (fileEnding.Equals(".gp5")) version = 5;
            if (fileEnding.Equals(".gpx")) version = 6;
            if (fileEnding.Equals(".gp")) version = 7;

            GPFile gpfile = null;

            switch (version)
            {
                case 3:
                    gpfile = new GP3File(content);
                    gpfile.readSong();
                    break;
                case 4:
                    gpfile = new GP4File(content);
                    gpfile.readSong();
                    break;
                case 5:
                    gpfile = new GP5File(content);
                    gpfile.readSong();

                    break;
                case 6:
                    gpfile = new GP6File(content);
                    gpfile.readSong();
                    gpfile = gpfile.self; //Replace with transferred GP5 file

                    break;
                case 7:
                    string archiveName = filename.Substring(8).Replace("%20", " ");
                    byte[] buffer = new byte[8200000];
                    MemoryStream stream = new MemoryStream(buffer);
                    using (var unzip = new Unzip(archiveName))
                    {
                        //Console.WriteLine("Listing files in the archive:");
                        // ListFiles(unzip);

                        unzip.Extract("Content/score.gpif", stream);
                        stream.Position = 0;
                        var sr = new StreamReader(stream);
                        string gp7xml = sr.ReadToEnd();

                        gpfile = new GP7File(gp7xml);
                        gpfile.readSong();
                        gpfile = gpfile.self; //Replace with transferred GP5 file

                    }
                    break;
                default:
                    Log.Debug("Unknown File Format");
                    break;
            }

            return gpfile;
        }
    }
}