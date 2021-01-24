namespace Api.Controllers

open System
open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open MidiExplorer.GuitarPro
open MidiExplorer.Core

[<ApiController>]
[<Route("[controller]")>]
type SongController(_logger: ILogger<SongController>) =
    inherit ControllerBase()

    [<HttpGet>]
    member _.Get() =
        async {
            let! bytes =
                IO.File.ReadAllBytesAsync("./test.gp3")
                |> Async.AwaitTask

            let gpfile = GP.Create("test.gp3", bytes)
            let native = NativeFormat(gpfile)

            return FromNative.toSong native
        }

    [<HttpPost>]
    [<Route("process")>]
    member _.Process() =
        async {
            let! bytes =
                IO.File.ReadAllBytesAsync("./test.gp3")
                |> Async.AwaitTask

            let gpfile = GP.Create("test.gp3", bytes)
            let native = NativeFormat(gpfile)

            return FromNative.toSong native
        }
