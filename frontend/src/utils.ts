export const fileAsUInt8Array = (file: File): Promise<Uint8Array> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function () {
      if (!this.result) {
        reject(`result array buffer of file ${file.name} is null`)
        return
      }

      if (typeof this.result === 'string') {
        reject(`result array buffer of file ${file.name} is string`)
        return
      }

      const arrayBuffer = this.result
      resolve(new Uint8Array(arrayBuffer))
    }
    reader.readAsArrayBuffer(file)
  })

export const noop = () => undefined
