use Rack::Static, :urls => ['/Ruby_Midwest_Sponsorship.pdf', 
                            '/facebox', 
                            '/javascripts', 
                            '/images',
                            '/css',
                            '/favicon.ico'], :root => "output"

run lambda { |env| [200, { 'Content-Type' => 'text/html', 'Cache-Control' => 'public, max-age=86400' }, File.open('output/index.html', File::RDONLY)] }

