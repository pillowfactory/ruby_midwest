use Rack::Static, :urls => ['/Ruby_Midwest_Sponsorship.pdf', 
                            '/travel-and-venue.html',
                            '/trivia/F15fKRw.html',
                            '/organizers.html',
                            '/speakers.html',
                            '/schedule.html',
                            '/schedule2.html',
                            '/email_confirm.html',
                            '/upcomingconferences.html',
                            '/conferenceList.json',
                            '/facebox', 
                            '/javascripts', 
                            '/images',
                            '/css',
                            '/favicon.ico'], :root => "output"

run lambda { |env| [200, { 'Content-Type' => 'text/html', 'Cache-Control' => 'public, max-age=86400' }, File.open('output/index.html', File::RDONLY)] }

