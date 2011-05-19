use Rack::Static,
  :urls => [
    "/index.html",
    "/Ruby_Midwest_Sponsorship_Prospectus_2011.pdf",
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