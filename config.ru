use Rack::Static,
  :urls => [
    "/index.html",
    "/rubymidwest-2013-prospectus.pdf",
    "/css",
    "/images",
    "/js",
    "~/slices"
  ]

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('index.html', File::RDONLY)
  ]
}
