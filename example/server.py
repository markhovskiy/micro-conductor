#!/usr/bin/env python3

import os
from http.server import HTTPServer, BaseHTTPRequestHandler


class StaticServer(BaseHTTPRequestHandler):
  def do_GET(self):
    root = os.path.dirname(os.path.abspath(__file__))
    filename = os.path.join(root, 'example.html' if self.path == '/' else self.path[1:])
    _, ext = os.path.splitext(filename)

    print('path:', self.path)
    print('filename:', filename)
    print('ext:', ext)

    if (not os.path.isfile(filename)):
      self.send_error(404, 'file not found: {}'.format(self.path))
      return

    self.send_response(200)
    self.send_header('Content-type', get_content_type(ext))
    self.end_headers()

    with open(filename, 'rb') as fh:
      self.wfile.write(fh.read())


def get_content_type(ext):
  if ext in ['.js', '.mjs', '.json']:
    return 'application/javascript'

  if ext == '.css':
    return 'text/css'

  if ext == '.ico':
    return 'image/x-icon'

  return 'text/html'


def run(server_class=HTTPServer, handler_class=StaticServer, port=8000):
  server_address = ('', port)
  httpd = server_class(server_address, handler_class)
  print('Starting httpd on http://localhost:{}'.format(port))
  httpd.serve_forever()


run()
